import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
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

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Template Marketplace</h1>
        <p className="text-lg text-muted-foreground">
          Discover and deploy production-ready infrastructure templates
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates, tags, providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </form>

        {/* Filter Actions */}
        <div className="flex items-center gap-2">
          {/* Sort */}
          <Select
            value={filters.sortBy}
            onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as any }))}
          >
            <SelectTrigger className="w-40">
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
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
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
              <div className="mt-6">
                <FilterContent filters={filters} setFilters={setFilters} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Filters</h3>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <FilterContent filters={filters} setFilters={setFilters} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge variant="outline">
                  Search: {searchQuery}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => {
                      setSearchQuery('');
                      updateUrlParams({ search: undefined });
                    }}
                  />
                </Badge>
              )}
              {filters.category && (
                <Badge variant="outline">
                  Category: {mockCategories.find(c => c.id === filters.category)?.name}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
                  />
                </Badge>
              )}
              {filters.provider && (
                <Badge variant="outline">
                  Provider: {mockProviders.find(p => p.id === filters.provider)?.name}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setFilters(prev => ({ ...prev, provider: undefined }))}
                  />
                </Badge>
              )}
            </div>
          )}

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                {filteredTemplates.length} templates found
              </h2>
              <p className="text-sm text-muted-foreground">
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