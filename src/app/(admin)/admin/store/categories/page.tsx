"use client"
import { useState } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronDown, 
  ChevronRight,
  Image as ImageIcon,
  ListTree,
  Move
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from '@/components/ui/card';

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  children?: Category[];
  productCount: number;
  isActive: boolean;
};

export default function CategoriesPage() {
  // Sample data - replace with API calls in a real application
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Electronics',
      slug: 'electronics',
      description: 'All electronic devices and accessories',
      image: '',
      parentId: null,
      productCount: 124,
      isActive: true,
      children: [
        {
          id: '2',
          name: 'Smartphones',
          slug: 'smartphones',
          description: 'Mobile phones and smartphones',
          image: '',
          parentId: '1',
          productCount: 56,
          isActive: true,
        },
        {
          id: '3',
          name: 'Laptops',
          slug: 'laptops',
          description: 'Laptops and notebooks',
          image: '',
          parentId: '1',
          productCount: 42,
          isActive: true,
        },
      ],
    },
    {
      id: '4',
      name: 'Clothing',
      slug: 'clothing',
      description: 'Fashion and apparel',
      image: '',
      parentId: null,
      productCount: 89,
      isActive: true,
      children: [
        {
          id: '5',
          name: "Men's Clothing",
          slug: 'mens-clothing',
          description: 'Clothing for men',
          image: '',
          parentId: '4',
          productCount: 45,
          isActive: true,
          children: [
            {
              id: '6',
              name: "Men's T-Shirts",
              slug: 'mens-tshirts',
              description: 'T-shirts for men',
              image: '',
              parentId: '5',
              productCount: 23,
              isActive: true,
            },
          ],
        },
        {
          id: '7',
          name: "Women's Clothing",
          slug: 'womens-clothing',
          description: 'Clothing for women',
          image: '',
          parentId: '4',
          productCount: 44,
          isActive: true,
        },
      ],
    },
    {
      id: '8',
      name: 'Home & Garden',
      slug: 'home-garden',
      description: 'Home decor and gardening supplies',
      image: '',
      parentId: null,
      productCount: 67,
      isActive: false,
    },
  ]);

  const [openCategory, setOpenCategory] = useState<string[]>(['1', '4']);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id' | 'children'>>({
    name: '',
    slug: '',
    description: '',
    image: '',
    parentId: null,
    productCount: 0,
    isActive: true,
  });

  const toggleCategory = (id: string) => {
    setOpenCategory(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setEditDialogOpen(true);
  };

  const handleDelete = (category: Category) => {
    setCurrentCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (currentCategory) {
      // In a real app, this would be an API call
      setCategories(prev => 
        prev.map(cat => 
          cat.id === currentCategory.id ? currentCategory : cat
        )
      );
    } else {
      // Add new category
      const newId = Math.random().toString(36).substring(2, 9);
      const categoryToAdd = {
        ...newCategory,
        id: newId,
        children: [],
        productCount: 0,
      };
      
      if (newCategory.parentId) {
        setCategories(prev => 
          prev.map(cat => 
            cat.id === newCategory.parentId 
              ? { ...cat, children: [...(cat.children || []), categoryToAdd] } 
              : cat
          )
        );
      } else {
        setCategories(prev => [...prev, categoryToAdd]);
      }
    }
    
    setEditDialogOpen(false);
    setCurrentCategory(null);
    setNewCategory({
      name: '',
      slug: '',
      description: '',
      image: '',
      parentId: null,
      productCount: 0,
      isActive: true,
    });
  };

  const confirmDelete = () => {
    if (currentCategory) {
      // In a real app, this would be an API call
      setCategories(prev => 
        prev.filter(cat => cat.id !== currentCategory.id)
      );
    }
    setDeleteDialogOpen(false);
    setCurrentCategory(null);
  };

  const renderCategories = (categories: Category[], level = 0) => {
    return categories.map(category => (
      <div key={category.id} className="space-y-2">
        <div className={`flex items-center p-2 rounded-md ${level > 0 ? 'ml-6' : ''}`}>
          {category.children && category.children.length > 0 ? (
            <Collapsible
              open={openCategory.includes(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
              className="w-full"
            >
              <div className="flex items-center w-full">
                <CollapsibleTrigger className="mr-2">
                  {openCategory.includes(category.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>
                <div className="flex-1 flex items-center">
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="outline" className="ml-2">
                    {category.productCount} products
                  </Badge>
                  {!category.isActive && (
                    <Badge variant="secondary" className="ml-2">
                      Inactive
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setNewCategory({
                        ...newCategory,
                        parentId: category.id
                      });
                      setCurrentCategory(null);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Child
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEdit(category)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(category)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <CollapsibleContent className="space-y-2">
                {category.children && renderCategories(category.children, level + 1)}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div className="flex items-center w-full pl-6">
              <div className="flex-1 flex items-center">
                <span className="font-medium">{category.name}</span>
                <Badge variant="outline" className="ml-2">
                  {category.productCount} products
                </Badge>
                {!category.isActive && (
                  <Badge variant="secondary" className="ml-2">
                    Inactive
                  </Badge>
                )}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setNewCategory({
                      ...newCategory,
                      parentId: category.id
                    });
                    setCurrentCategory(null);
                    setEditDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Child
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleEdit(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDelete(category)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => {
          setCurrentCategory(null);
          setNewCategory({
            name: '',
            slug: '',
            description: '',
            image: '',
            parentId: null,
            productCount: 0,
            isActive: true,
          });
          setEditDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input 
                placeholder="Search categories..." 
                className="max-w-md"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Move className="h-4 w-4 mr-2" />
                Reorder
              </Button>
              <Button variant="outline">
                <ListTree className="h-4 w-4 mr-2" />
                View as Tree
              </Button>
            </div>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="p-4">
            {renderCategories(categories)}
          </div>
        </ScrollArea>
      </Card>

      {/* Edit/Add Category Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <Input 
                  value={currentCategory?.name || newCategory.name}
                  onChange={(e) => 
                    currentCategory
                      ? setCurrentCategory({...currentCategory, name: e.target.value})
                      : setNewCategory({...newCategory, name: e.target.value})
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug *</label>
                <Input 
                  value={currentCategory?.slug || newCategory.slug}
                  onChange={(e) => 
                    currentCategory
                      ? setCurrentCategory({...currentCategory, slug: e.target.value})
                      : setNewCategory({...newCategory, slug: e.target.value})
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Parent Category</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currentCategory?.parentId || newCategory.parentId || ''}
                  onChange={(e) => {
                    const value = e.target.value === '' ? null : e.target.value;
                    currentCategory
                      ? setCurrentCategory({...currentCategory, parentId: value})
                      : setNewCategory({...newCategory, parentId: value})
                  }}
                >
                  <option value="">No parent (root category)</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={currentCategory?.isActive ?? newCategory.isActive}
                  onChange={(e) => 
                    currentCategory
                      ? setCurrentCategory({...currentCategory, isActive: e.target.checked})
                      : setNewCategory({...newCategory, isActive: e.target.checked})
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Active
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={currentCategory?.description || newCategory.description}
                  onChange={(e) => 
                    currentCategory
                      ? setCurrentCategory({...currentCategory, description: e.target.value})
                      : setNewCategory({...newCategory, description: e.target.value})
                  }
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {currentCategory?.image || newCategory.image 
                          ? 'Change image' 
                          : 'Click to upload'}
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {currentCategory ? 'Save Changes' : 'Add Category'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the "{currentCategory?.name}" category and remove all its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}