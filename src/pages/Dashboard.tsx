import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { mockTemplates } from '@/data/mockData';
import { 
  Plus, 
  Settings, 
  TrendingUp, 
  Download, 
  Star, 
  Eye,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user data
  const user = {
    name: 'Alex Chen',
    username: 'devops_ninja',
    avatar: '/avatars/alex.jpg',
    email: 'alex@example.com',
    company: 'TechCorp',
    verified: true,
    templatesCreated: 12,
    totalDownloads: 15420,
    totalViews: 45230,
    averageRating: 4.7
  };

  // Mock user's templates
  const userTemplates = mockTemplates.filter(t => t.author.username === user.username);

  const stats = [
    {
      title: 'Templates Created',
      value: user.templatesCreated,
      icon: Plus,
      change: '+2 this month'
    },
    {
      title: 'Total Downloads',
      value: user.totalDownloads.toLocaleString(),
      icon: Download,
      change: '+1.2K this month'
    },
    {
      title: 'Total Views',
      value: user.totalViews.toLocaleString(),
      icon: Eye,
      change: '+3.4K this month'
    },
    {
      title: 'Average Rating',
      value: user.averageRating.toFixed(1),
      icon: Star,
      change: '+0.1 this month'
    }
  ];

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
              {user.verified && (
                <Badge variant="outline" className="text-success border-success">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">@{user.username}</p>
            {user.company && (
              <p className="text-sm text-muted-foreground">{user.company}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button asChild>
            <Link to="/dashboard/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="templates">My Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest template activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Template downloaded', name: 'AWS EKS Cluster', time: '2 hours ago' },
                    { action: 'New review received', name: 'Serverless Web App Stack', time: '1 day ago' },
                    { action: 'Template updated', name: 'Multi-Region RDS Setup', time: '3 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks you might want to do
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link to="/dashboard/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Template
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/marketplace">
                    <Eye className="h-4 w-4 mr-2" />
                    Browse Marketplace
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/dashboard/analytics">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">My Templates</h2>
              <p className="text-muted-foreground">
                Manage your published templates
              </p>
            </div>
            <Button asChild>
              <Link to="/dashboard/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Link>
            </Button>
          </div>

          {userTemplates.length > 0 ? (
            <div className="space-y-6">
              {userTemplates.map((template) => (
                <Card key={template.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <img 
                            src={template.logoUrl} 
                            alt={template.name}
                            className="h-10 w-10 rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{template.name}</h3>
                            <p className="text-sm text-muted-foreground">v{template.version}</p>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4">{template.shortDescription}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>{template.downloadCount.toLocaleString()} downloads</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span>{template.rating} ({template.reviewCount} reviews)</span>
                          </div>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/template/${template.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Template
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/dashboard/edit/${template.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Template
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Template
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No templates yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first template to share with the community
                </p>
                <Button asChild>
                  <Link to="/dashboard/create">
                    Create Your First Template
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Track your template performance and user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and insights will be available here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your public profile and account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
                <p className="text-muted-foreground mb-6">
                  Update your profile information and preferences
                </p>
                <Button asChild>
                  <Link to="/dashboard/settings">
                    Go to Settings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}