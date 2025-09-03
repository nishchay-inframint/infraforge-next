import { Template, User, TemplateCategory, CloudProvider } from '../types';

export const mockCategories: TemplateCategory[] = [
  {
    id: 'containers',
    name: 'Containers',
    description: 'Docker, Kubernetes, and container orchestration templates',
    icon: 'Container',
    color: 'accent'
  },
  {
    id: 'serverless',
    name: 'Serverless',
    description: 'AWS Lambda, Azure Functions, and serverless architecture',
    icon: 'Zap',
    color: 'warning'
  },
  {
    id: 'databases',
    name: 'Databases',
    description: 'RDS, NoSQL, and database infrastructure templates',
    icon: 'Database',
    color: 'success'
  },
  {
    id: 'networking',
    name: 'Networking',
    description: 'VPC, Load Balancers, and network security templates',
    icon: 'Network',
    color: 'primary'
  },
  {
    id: 'security',
    name: 'Security',
    description: 'IAM, security groups, and compliance templates',
    icon: 'Shield',
    color: 'destructive'
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    description: 'CloudWatch, logging, and observability templates',
    icon: 'Activity',
    color: 'secondary'
  }
];

export const mockProviders: CloudProvider[] = [
  {
    id: 'aws',
    name: 'AWS',
    icon: 'Cloud',
    color: 'warning'
  },
  {
    id: 'azure',
    name: 'Azure',
    icon: 'Cloud',
    color: 'primary'
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    icon: 'Cloud',
    color: 'success'
  },
  {
    id: 'terraform',
    name: 'Terraform',
    icon: 'Settings',
    color: 'accent'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: 'Container',
    color: 'primary'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'devops_ninja',
    email: 'ninja@devops.com',
    fullName: 'Alex Chen',
    avatar: '/avatars/alex.jpg',
    bio: 'Senior DevOps Engineer passionate about infrastructure automation',
    company: 'TechCorp',
    website: 'https://alexchen.dev',
    location: 'San Francisco, CA',
    verified: true,
    role: 'creator',
    joinedAt: '2023-01-15',
    templatesCreated: 12,
    totalDownloads: 15420
  },
  {
    id: '2',
    username: 'cloud_architect',
    email: 'sarah@cloudexpert.com',
    fullName: 'Sarah Mitchell',
    avatar: '/avatars/sarah.jpg',
    bio: 'Cloud Solutions Architect with 8+ years experience',
    company: 'CloudSolutions Inc',
    verified: true,
    role: 'creator',
    joinedAt: '2022-11-20',
    templatesCreated: 8,
    totalDownloads: 9876
  }
];

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'AWS EKS Cluster with Auto Scaling',
    description: 'Production-ready Amazon EKS cluster with auto-scaling node groups, VPC configuration, and security best practices. Includes monitoring setup with CloudWatch and AWS Load Balancer Controller.',
    shortDescription: 'Production-ready EKS cluster with auto-scaling and monitoring',
    category: mockCategories[0], // containers
    provider: mockProviders[0], // aws
    author: mockUsers[0],
    version: '2.1.0',
    tags: ['kubernetes', 'eks', 'auto-scaling', 'production', 'monitoring'],
    downloadCount: 5420,
    rating: 4.8,
    reviewCount: 127,
    createdAt: '2023-08-15',
    updatedAt: '2024-01-10',
    documentation: 'Complete setup guide with step-by-step instructions',
    sourceUrl: 'https://github.com/devops-ninja/eks-template',
    logoUrl: '/logos/eks.png',
    verified: true,
    pricing: 'free',
    features: [
      'Auto-scaling node groups',
      'VPC with public/private subnets',
      'Security groups and RBAC',
      'CloudWatch monitoring',
      'AWS Load Balancer Controller',
      'Cluster autoscaler'
    ],
    requirements: [
      'AWS CLI configured',
      'kubectl installed',
      'Terraform >= 1.0',
      'AWS IAM permissions'
    ],
    deployment: {
      estimatedTime: '15-20 minutes',
      complexity: 'intermediate',
      resources: ['EKS Cluster', 'EC2 Instances', 'VPC', 'Load Balancer'],
      cost: '$50-150/month'
    }
  },
  {
    id: '2',
    name: 'Serverless Web App Stack',
    description: 'Complete serverless architecture for modern web applications using AWS Lambda, API Gateway, DynamoDB, and CloudFront. Includes CI/CD pipeline with GitHub Actions.',
    shortDescription: 'Complete serverless web app with CI/CD pipeline',
    category: mockCategories[1], // serverless
    provider: mockProviders[0], // aws
    author: mockUsers[1],
    version: '1.5.2',
    tags: ['serverless', 'lambda', 'api-gateway', 'dynamodb', 'cloudfront'],
    downloadCount: 3210,
    rating: 4.6,
    reviewCount: 89,
    createdAt: '2023-09-20',
    updatedAt: '2024-01-05',
    documentation: 'Comprehensive guide with deployment examples',
    sourceUrl: 'https://github.com/cloud-architect/serverless-stack',
    logoUrl: '/logos/serverless.png',
    verified: true,
    pricing: 'free',
    features: [
      'AWS Lambda functions',
      'API Gateway REST API',
      'DynamoDB database',
      'CloudFront CDN',
      'GitHub Actions CI/CD',
      'Environment management'
    ],
    requirements: [
      'AWS CLI configured',
      'Node.js >= 14',
      'GitHub repository',
      'AWS IAM permissions'
    ],
    deployment: {
      estimatedTime: '10-15 minutes',
      complexity: 'beginner',
      resources: ['Lambda Functions', 'API Gateway', 'DynamoDB', 'CloudFront'],
      cost: '$10-30/month'
    }
  },
  {
    id: '3',
    name: 'Multi-Region RDS Setup',
    description: 'High-availability PostgreSQL RDS setup with read replicas across multiple regions, automated backups, and monitoring dashboards.',
    shortDescription: 'High-availability multi-region PostgreSQL RDS',
    category: mockCategories[2], // databases
    provider: mockProviders[0], // aws
    author: mockUsers[0],
    version: '1.3.0',
    tags: ['postgresql', 'rds', 'multi-region', 'high-availability', 'backup'],
    downloadCount: 2150,
    rating: 4.7,
    reviewCount: 45,
    createdAt: '2023-10-05',
    updatedAt: '2023-12-20',
    documentation: 'Database deployment and migration guide',
    sourceUrl: 'https://github.com/devops-ninja/rds-template',
    logoUrl: '/logos/postgresql.png',
    verified: true,
    pricing: 'free',
    features: [
      'PostgreSQL RDS instances',
      'Cross-region read replicas',
      'Automated backups',
      'Performance monitoring',
      'Security groups',
      'Parameter groups'
    ],
    requirements: [
      'AWS CLI configured',
      'Terraform >= 1.0',
      'VPC setup',
      'AWS IAM permissions'
    ],
    deployment: {
      estimatedTime: '20-30 minutes',
      complexity: 'advanced',
      resources: ['RDS Instances', 'Subnet Groups', 'Security Groups'],
      cost: '$100-300/month'
    }
  }
];