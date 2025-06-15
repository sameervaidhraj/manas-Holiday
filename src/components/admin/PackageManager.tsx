
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import PackageForm from './PackageForm';
import { useToast } from '@/hooks/use-toast';

interface Package {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: string;
  rating: number;
  image: string;
  features: string[];
}

interface PackageManagerProps {
  packages: Package[];
  onUpdatePackages: (packages: Package[]) => void;
}

const PackageManager: React.FC<PackageManagerProps> = ({ packages, onUpdatePackages }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const { toast } = useToast();

  const handleAddPackage = () => {
    setEditingPackage(null);
    setIsFormOpen(true);
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsFormOpen(true);
  };

  const handleDeletePackage = (id: number) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      const updatedPackages = packages.filter(pkg => pkg.id !== id);
      onUpdatePackages(updatedPackages);
      toast({
        title: "Package deleted",
        description: "The package has been successfully deleted.",
      });
    }
  };

  const handleSavePackage = (packageData: Omit<Package, 'id'>) => {
    if (editingPackage) {
      // Update existing package
      const updatedPackages = packages.map(pkg =>
        pkg.id === editingPackage.id
          ? { ...packageData, id: editingPackage.id }
          : pkg
      );
      onUpdatePackages(updatedPackages);
      toast({
        title: "Package updated",
        description: "The package has been successfully updated.",
      });
    } else {
      // Add new package
      const newId = Math.max(...packages.map(p => p.id), 0) + 1;
      const newPackage = { ...packageData, id: newId };
      onUpdatePackages([...packages, newPackage]);
      toast({
        title: "Package added",
        description: "The new package has been successfully added.",
      });
    }
    setIsFormOpen(false);
    setEditingPackage(null);
  };

  if (isFormOpen) {
    return (
      <PackageForm
        package={editingPackage}
        onSave={handleSavePackage}
        onCancel={() => {
          setIsFormOpen(false);
          setEditingPackage(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Package Management</h2>
          <p className="text-gray-600">Add, edit, or remove travel packages</p>
        </div>
        <Button onClick={handleAddPackage} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  <span className="text-xs font-semibold">{pkg.rating}</span>
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{pkg.title}</CardTitle>
              <div className="text-sm text-gray-600">
                <div>{pkg.location}</div>
                <div>{pkg.duration}</div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                {pkg.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold">{pkg.price}</span>
                <span className="text-sm text-gray-600">per person</span>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPackage(pkg)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="flex-1"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackageManager;
