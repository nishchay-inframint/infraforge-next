import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { mockTemplates, mockCategories } from '@/data/mockData';
import { 
  Search, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  Download,
  Star,
  TrendingUp,
  Code2,
  Cloud,
  Container,
  Database,
  Network,
  Activity
} from 'lucide-react';

const iconMap = {
  Container,
  Zap,
  Database,
  Network,
  Shield,
  Activity
};

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredTemplates = mockTemplates.slice(0, 3);
  const stats = [
    { label: 'Templates', value: '2,500+', icon: Code2 },
    { label: 'Downloads', value: '150K+', icon: Download },
    { label: 'Creators', value: '800+', icon: Users },
    { label: 'Average Rating', value: '4.8', icon: Star }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/marketplace?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container relative py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 animate-fade-in">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trusted by 10,000+ DevOps teams
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Infrastructure Templates
              <span className="block text-primary">Made Simple</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
              Deploy production-ready infrastructure in minutes with our curated collection 
              of Infrastructure-as-Code templates from the community.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8 animate-fade-in">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search AWS, Kubernetes, Terraform templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg shadow-medium"
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10"
                >
                  Search
                </Button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Button size="lg" asChild>
                <Link to="/marketplace">
                  Browse Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/signup">
                  Start Creating
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="text-center hover-lift animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect template for your infrastructure needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <Link key={category.id} to={`/marketplace?category=${category.id}`}>
                <Card className="group hover-lift cursor-pointer animate-fade-in">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-${category.color}/10`}>
                        {IconComponent && <IconComponent className={`h-6 w-6 text-${category.color}`} />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Templates */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Featured Templates
            </h2>
            <p className="text-lg text-muted-foreground">
              Popular and highly-rated templates from our community
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/marketplace">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <TemplateGrid templates={featuredTemplates} />
      </section>

      {/* CTA Section */}
      <section className="container">
        <Card className="bg-gradient-hero text-primary-foreground">
          <CardContent className="py-16 px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Share Your Templates?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of developers sharing infrastructure templates 
                and help others deploy faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/signup">
                    <Users className="mr-2 h-4 w-4" />
                    Join the Community
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link to="/docs">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}