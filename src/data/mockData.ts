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
    tags: ['kubernetes', 'eks', 'auto-scaling', 'production', 'monitoring', 'ec2'],
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
  },
  {
    id: '4',
    name: 'AWS EC2 Auto Scaling Group',
    description: 'Scalable EC2 infrastructure with auto scaling groups, load balancers, and CloudWatch monitoring. Perfect for web applications and microservices.',
    shortDescription: 'Auto-scaling EC2 infrastructure with load balancing',
    category: mockCategories[0], // containers
    provider: mockProviders[0], // aws
    author: mockUsers[1],
    version: '1.8.0',
    tags: ['ec2', 'auto-scaling', 'load-balancer', 'cloudwatch', 'vpc'],
    downloadCount: 4890,
    rating: 4.5,
    reviewCount: 156,
    createdAt: '2023-07-10',
    updatedAt: '2024-01-15',
    documentation: 'EC2 auto scaling deployment guide',
    sourceUrl: 'https://github.com/cloud-architect/ec2-autoscaling',
    logoUrl: '/logos/ec2.png',
    verified: true,
    pricing: 'free',
    features: [
      'EC2 Auto Scaling Groups',
      'Application Load Balancer',
      'CloudWatch monitoring',
      'VPC configuration',
      'Security groups',
      'Launch templates'
    ],
    requirements: [
      'AWS CLI configured',
      'Terraform >= 1.0',
      'AWS IAM permissions',
      'SSH key pair'
    ],
    deployment: {
      estimatedTime: '10-15 minutes',
      complexity: 'intermediate',
      resources: ['EC2 Instances', 'Auto Scaling Group', 'Load Balancer', 'VPC'],
      cost: '$30-100/month'
    }
  },
  {
    id: '5',
    name: 'Azure Functions Serverless API',
    description: 'Serverless API built with Azure Functions, Cosmos DB, and API Management. Includes monitoring with Application Insights.',
    shortDescription: 'Azure serverless API with Cosmos DB integration',
    category: mockCategories[1], // serverless
    provider: mockProviders[1], // azure
    author: mockUsers[0],
    version: '2.0.1',
    tags: ['azure-functions', 'cosmos-db', 'api-management', 'serverless', 'monitoring'],
    downloadCount: 2890,
    rating: 4.4,
    reviewCount: 67,
    createdAt: '2023-09-05',
    updatedAt: '2023-12-18',
    documentation: 'Azure Functions deployment and configuration',
    sourceUrl: 'https://github.com/devops-ninja/azure-functions-api',
    logoUrl: '/logos/azure-functions.png',
    verified: true,
    pricing: 'free',
    features: [
      'Azure Functions runtime',
      'Cosmos DB integration',
      'API Management gateway',
      'Application Insights',
      'Key Vault integration',
      'ARM templates'
    ],
    requirements: [
      'Azure CLI configured',
      'Azure subscription',
      'Resource group',
      'Azure PowerShell'
    ],
    deployment: {
      estimatedTime: '12-18 minutes',
      complexity: 'intermediate',
      resources: ['Function Apps', 'Cosmos DB', 'API Management', 'Application Insights'],
      cost: '$20-60/month'
    }
  },
  {
    id: '6',
    name: 'Google Cloud Run Microservices',
    description: 'Containerized microservices deployment on Google Cloud Run with Cloud SQL, Load Balancing, and Cloud Monitoring.',
    shortDescription: 'Cloud Run microservices with managed database',
    category: mockCategories[0], // containers
    provider: mockProviders[2], // gcp
    author: mockUsers[1],
    version: '1.4.3',
    tags: ['cloud-run', 'microservices', 'cloud-sql', 'containers', 'monitoring'],
    downloadCount: 1850,
    rating: 4.6,
    reviewCount: 43,
    createdAt: '2023-08-20',
    updatedAt: '2024-01-08',
    documentation: 'Cloud Run deployment and scaling guide',
    sourceUrl: 'https://github.com/cloud-architect/gcp-cloud-run',
    logoUrl: '/logos/cloud-run.png',
    verified: true,
    pricing: 'free',
    features: [
      'Cloud Run services',
      'Cloud SQL database',
      'Cloud Load Balancing',
      'Cloud Monitoring',
      'IAM policies',
      'Container registry'
    ],
    requirements: [
      'Google Cloud SDK',
      'Docker installed',
      'GCP project setup',
      'Service account keys'
    ],
    deployment: {
      estimatedTime: '15-25 minutes',
      complexity: 'intermediate',
      resources: ['Cloud Run', 'Cloud SQL', 'Load Balancer', 'VPC'],
      cost: '$25-80/month'
    }
  },
  {
    id: '7',
    name: 'AWS Lambda Event Processing',
    description: 'Event-driven architecture with AWS Lambda, SQS, SNS, and EventBridge. Perfect for processing high-volume events and notifications.',
    shortDescription: 'Event-driven Lambda architecture with queues',
    category: mockCategories[1], // serverless
    provider: mockProviders[0], // aws
    author: mockUsers[0],
    version: '1.6.0',
    tags: ['lambda', 'sqs', 'sns', 'eventbridge', 'event-driven', 'serverless'],
    downloadCount: 3750,
    rating: 4.7,
    reviewCount: 92,
    createdAt: '2023-06-15',
    updatedAt: '2023-11-30',
    documentation: 'Event processing architecture guide',
    sourceUrl: 'https://github.com/devops-ninja/lambda-events',
    logoUrl: '/logos/lambda.png',
    verified: true,
    pricing: 'free',
    features: [
      'AWS Lambda functions',
      'SQS message queues',
      'SNS notifications',
      'EventBridge rules',
      'Dead letter queues',
      'CloudWatch logs'
    ],
    requirements: [
      'AWS CLI configured',
      'SAM CLI installed',
      'AWS IAM permissions',
      'Python or Node.js'
    ],
    deployment: {
      estimatedTime: '8-12 minutes',
      complexity: 'beginner',
      resources: ['Lambda Functions', 'SQS Queues', 'SNS Topics', 'EventBridge'],
      cost: '$5-25/month'
    }
  },
  {
    id: '8',
    name: 'Azure Virtual Machines Scale Set',
    description: 'Scalable VM infrastructure with Azure Virtual Machine Scale Sets, Load Balancer, and Azure Monitor for high-availability applications.',
    shortDescription: 'Azure VM scale sets with load balancing',
    category: mockCategories[0], // containers
    provider: mockProviders[1], // azure
    author: mockUsers[1],
    version: '1.2.4',
    tags: ['virtual-machines', 'scale-sets', 'load-balancer', 'azure-monitor', 'autoscaling'],
    downloadCount: 1920,
    rating: 4.3,
    reviewCount: 38,
    createdAt: '2023-10-12',
    updatedAt: '2024-01-03',
    documentation: 'VM Scale Sets configuration and management',
    sourceUrl: 'https://github.com/cloud-architect/azure-vmss',
    logoUrl: '/logos/azure-vm.png',
    verified: true,
    pricing: 'free',
    features: [
      'VM Scale Sets',
      'Azure Load Balancer',
      'Auto-scaling policies',
      'Azure Monitor',
      'Network security groups',
      'Managed disks'
    ],
    requirements: [
      'Azure CLI configured',
      'Azure subscription',
      'Resource group',
      'SSH public key'
    ],
    deployment: {
      estimatedTime: '18-25 minutes',
      complexity: 'intermediate',
      resources: ['VM Scale Sets', 'Load Balancer', 'Virtual Network', 'Storage'],
      cost: '$80-200/month'
    }
  }
];