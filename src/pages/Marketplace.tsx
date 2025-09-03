import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { ResourceFilter } from '@/components/templates/ResourceFilter';
import { mockTemplates, mockCategories, mockProviders } from '@/data/mockData';
import { SearchFilters, Template } from '@/types';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal,
  Grid3X3,
  List
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'popular'
  });
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockTemplates);

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const provider = searchParams.get('provider');
    const search = searchParams.get('search');
    
    setFilters(prev => ({
      ...prev,
      category: category || undefined,
      provider: provider || undefined
    }));
    
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Filter templates based on current filters
  useEffect(() => {
    let filtered = [...mockTemplates];

    // Search filter with resource-specific matching
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some(tag => tag.toLowerCase().includes(query)) ||
        template.deployment.resources.some(resource => resource.toLowerCase().includes(query)) ||
        template.features.some(feature => feature.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(template => template.category.id === filters.category);
    }

    // Provider filter
    if (filters.provider) {
      filtered = filtered.filter(template => template.provider.id === filters.provider);
    }

    // Pricing filter
    if (filters.pricing) {
      filtered = filtered.filter(template => template.pricing === filters.pricing);
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(template => template.rating >= filters.rating!);
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      default: // 'popular'
        filtered.sort((a, b) => (b.downloadCount * b.rating) - (a.downloadCount * a.rating));
    }

    setFilteredTemplates(filtered);
  }, [searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams({ search: searchQuery || undefined });
  };

  const updateUrlParams = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'popular' });
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0) - 1; // -1 for sortBy which is always set

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b bg-card/30 backdrop-blur-sm">
        <div className="container py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Template Marketplace
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover and deploy production-ready infrastructure templates for AWS, Azure, and Google Cloud
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="border-b bg-muted/20">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by resource: EC2, Lambda, RDS, Azure Functions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-12"
                />
              </div>
            </form>

            {/* Filter Actions */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <Select
                value={filters.sortBy}
                onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as any }))}
              >
                <SelectTrigger className="w-44 h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none h-12 px-4"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none h-12 px-4"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your template search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <ResourceFilter 
                      searchQuery={searchQuery}
                      onSearch={setSearchQuery}
                    />
                    <FilterContent filters={filters} setFilters={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6 bg-card/50 backdrop-blur-sm border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear ({activeFiltersCount})
                  </Button>
                )}
              </div>
              
              {/* Resource Filter */}
              <ResourceFilter 
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                className="mb-6"
              />
              
              <FilterContent filters={filters} setFilters={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium">Active filters:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge variant="outline" className="gap-1">
                      Search: {searchQuery}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => {
                          setSearchQuery('');
                          updateUrlParams({ search: undefined });
                        }}
                      />
                    </Badge>
                  )}
                  {filters.category && (
                    <Badge variant="outline" className="gap-1">
                      Category: {mockCategories.find(c => c.id === filters.category)?.name}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
                      />
                    </Badge>
                  )}
                  {filters.provider && (
                    <Badge variant="outline" className="gap-1">
                      Provider: {mockProviders.find(p => p.id === filters.provider)?.name}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-destructive" 
                        onClick={() => setFilters(prev => ({ ...prev, provider: undefined }))}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-1">
                  {filteredTemplates.length} templates found
                </h2>
                <p className="text-muted-foreground">
                  Showing {filteredTemplates.length} of {mockTemplates.length} total templates
                </p>
              </div>
            </div>

            {/* Templates Grid */}
            <TemplateGrid 
              templates={filteredTemplates} 
              loading={loading}
              variant={viewMode === 'grid' ? 'default' : 'compact'}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

function FilterContent({ 
  filters, 
  setFilters 
}: { 
  filters: SearchFilters; 
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>> 
}) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Categories</Label>
        <div className="space-y-2">
          {mockCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.category === category.id}
                onCheckedChange={(checked) => {
                  setFilters(prev => ({
                    ...prev,
                    category: checked ? category.id : undefined
                  }));
                }}
              />
              <Label 
                htmlFor={`category-${category.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Providers */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Providers</Label>
        <div className="space-y-2">
          {mockProviders.map((provider) => (
            <div key={provider.id} className="flex items-center space-x-2">
              <Checkbox
                id={`provider-${provider.id}`}
                checked={filters.provider === provider.id}
                onCheckedChange={(checked) => {
                  setFilters(prev => ({
                    ...prev,
                    provider: checked ? provider.id : undefined
                  }));
                }}
              />
              <Label 
                htmlFor={`provider-${provider.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {provider.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Pricing */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Pricing</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pricing-free"
              checked={filters.pricing === 'free'}
              onCheckedChange={(checked) => {
                setFilters(prev => ({
                  ...prev,
                  pricing: checked ? 'free' : undefined
                }));
              }}
            />
            <Label htmlFor="pricing-free" className="text-sm font-normal cursor-pointer">
              Free
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="pricing-paid"
              checked={filters.pricing === 'paid'}
              onCheckedChange={(checked) => {
                setFilters(prev => ({
                  ...prev,
                  pricing: checked ? 'paid' : undefined
                }));
              }}
            />
            <Label htmlFor="pricing-paid" className="text-sm font-normal cursor-pointer">
              Premium
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}