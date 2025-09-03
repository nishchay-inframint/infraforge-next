import { Link } from 'react-router-dom';
import { Template } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, 
  Download, 
  Clock, 
  Shield, 
  ExternalLink,
  Heart,
  Bookmark
} from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  variant?: 'default' | 'compact';
}

export function TemplateCard({ template, variant = 'default' }: TemplateCardProps) {
  const isCompact = variant === 'compact';

  return (
    <Card className="group hover-lift animate-fade-in">
      <CardHeader className={isCompact ? 'pb-3' : 'pb-4'}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-card border flex items-center justify-center">
              <img 
                src={template.logoUrl} 
                alt={template.name}
                className="h-8 w-8"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Link 
                  to={`/template/${template.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors truncate"
                >
                  {template.name}
                </Link>
                {template.verified && (
                  <Shield className="h-4 w-4 text-success flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Link
                  to={`/user/${template.author.username}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  by {template.author.username}
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={isCompact ? 'pt-0 pb-3' : 'pt-0 pb-4'}>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {template.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          <Badge 
            variant="secondary" 
            className={`text-xs ${template.provider.color === 'warning' ? 'bg-warning-light text-warning-foreground' : ''}`}
          >
            {template.provider.name}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {template.category.name}
          </Badge>
          {template.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {template.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{template.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span>{template.rating}</span>
              <span>({template.reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>{template.downloadCount.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{template.deployment.estimatedTime}</span>
          </div>
        </div>

        {/* Deployment Info */}
        {!isCompact && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-muted-foreground">Complexity:</span>
                  <Badge 
                    variant={
                      template.deployment.complexity === 'beginner' ? 'default' :
                      template.deployment.complexity === 'intermediate' ? 'secondary' : 'outline'
                    }
                    className="ml-1 text-xs"
                  >
                    {template.deployment.complexity}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Cost:</span>
                  <span className="ml-1 font-medium">{template.deployment.cost}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={template.author.avatar} />
              <AvatarFallback className="text-xs">
                {template.author.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">
              v{template.version}
            </span>
            {template.pricing === 'free' && (
              <Badge variant="outline" className="text-xs text-success">
                Free
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/template/${template.id}`}>
                View Details
              </Link>
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-1" />
              Deploy
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}