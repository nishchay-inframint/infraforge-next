// Core type definitions for IaC Templates Marketplace

export interface Template {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: TemplateCategory;
  provider: CloudProvider;
  author: User;
  version: string;
  tags: string[];
  downloadCount: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  documentation: string;
  sourceUrl: string;
  logoUrl: string;
  verified: boolean;
  pricing: 'free' | 'paid';
  price?: number;
  features: string[];
  requirements: string[];
  deployment: DeploymentInfo;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  bio?: string;
  company?: string;
  website?: string;
  location?: string;
  verified: boolean;
  role: 'creator' | 'admin' | 'user';
  joinedAt: string;
  templatesCreated: number;
  totalDownloads: number;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface CloudProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface DeploymentInfo {
  estimatedTime: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
  resources: string[];
  cost: string;
}

export interface Review {
  id: string;
  templateId: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface Download {
  id: string;
  templateId: string;
  userId: string;
  downloadedAt: string;
  version: string;
}

export interface SearchFilters {
  category?: string;
  provider?: string;
  pricing?: 'free' | 'paid';
  complexity?: string;
  rating?: number;
  sortBy?: 'popular' | 'newest' | 'rating' | 'downloads';
}