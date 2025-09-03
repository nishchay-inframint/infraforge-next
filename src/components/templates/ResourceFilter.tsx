import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

// Common cloud resources for quick filtering
const commonResources = [
  { name: 'EC2', category: 'Compute', providers: ['AWS'] },
  { name: 'Lambda', category: 'Serverless', providers: ['AWS'] },
  { name: 'RDS', category: 'Database', providers: ['AWS'] },
  { name: 'EKS', category: 'Containers', providers: ['AWS'] },
  { name: 'S3', category: 'Storage', providers: ['AWS'] },
  { name: 'VPC', category: 'Networking', providers: ['AWS'] },
  { name: 'Azure Functions', category: 'Serverless', providers: ['Azure'] },
  { name: 'Virtual Machines', category: 'Compute', providers: ['Azure'] },
  { name: 'Cosmos DB', category: 'Database', providers: ['Azure'] },
  { name: 'Cloud Run', category: 'Containers', providers: ['GCP'] },
  { name: 'Cloud SQL', category: 'Database', providers: ['GCP'] },
  { name: 'Kubernetes', category: 'Containers', providers: ['AWS', 'Azure', 'GCP'] },
  { name: 'Load Balancer', category: 'Networking', providers: ['AWS', 'Azure', 'GCP'] },
  { name: 'Auto Scaling', category: 'Compute', providers: ['AWS', 'Azure', 'GCP'] }
];

interface ResourceFilterProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  className?: string;
}

export function ResourceFilter({ searchQuery, onSearch, className }: ResourceFilterProps) {
  const [showAllResources, setShowAllResources] = useState(false);
  
  const displayedResources = showAllResources 
    ? commonResources 
    : commonResources.slice(0, 8);

  const handleResourceClick = (resourceName: string) => {
    onSearch(resourceName);
  };

  const clearSearch = () => {
    onSearch('');
  };

  return (
    <div className={className}>
      {/* Quick Resource Search */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Quick Resource Search</Label>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Type resource name: EC2, Lambda, RDS..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {/* Common Resources Tags */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {displayedResources.map((resource) => (
              <Badge
                key={resource.name}
                variant={searchQuery.toLowerCase() === resource.name.toLowerCase() ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleResourceClick(resource.name)}
              >
                {resource.name}
                <span className="ml-1 text-xs opacity-70">
                  {resource.providers.join('/')}
                </span>
              </Badge>
            ))}
          </div>
          
          {commonResources.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllResources(!showAllResources)}
              className="text-xs"
            >
              {showAllResources ? 'Show Less' : `Show All ${commonResources.length} Resources`}
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Search Tips */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <Label className="text-xs font-medium block mb-2">Search Tips:</Label>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Search by service name (EC2, Lambda, RDS)</li>
          <li>• Include provider (AWS Lambda, Azure Functions)</li>
          <li>• Use features (auto-scaling, monitoring)</li>
          <li>• Try categories (serverless, containers)</li>
        </ul>
      </div>
    </div>
  );
}