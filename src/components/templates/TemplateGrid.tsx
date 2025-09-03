import { Template } from '@/types';
import { TemplateCard } from './TemplateCard';
import { TemplateGridSkeleton } from './TemplateGridSkeleton';

interface TemplateGridProps {
  templates: Template[];
  loading?: boolean;
  variant?: 'default' | 'compact';
}

export function TemplateGrid({ templates, loading = false, variant = 'default' }: TemplateGridProps) {
  if (loading) {
    return <TemplateGridSkeleton variant={variant} />;
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No templates found
          </h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search criteria or browse our featured templates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      variant === 'compact' 
        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
    }`}>
      {templates.map((template) => (
        <TemplateCard 
          key={template.id} 
          template={template} 
          variant={variant}
        />
      ))}
    </div>
  );
}