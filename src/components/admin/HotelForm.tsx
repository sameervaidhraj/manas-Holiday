
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

type Hotel = Tables<'hotels'>;

const hotelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  rating: z.coerce.number().min(0).max(5, 'Rating must be between 0 and 5'),
  reviews: z.coerce.number().int().min(0, 'Reviews must be a positive number'),
  price: z.string().min(1, 'Price is required'),
  original_price: z.string().min(1, 'Original price is required'),
  image: z.string().url('Must be a valid URL'),
  amenities: z.string().min(1, 'Amenities are required'),
});

type HotelFormData = z.infer<typeof hotelSchema>;

interface HotelFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  hotel?: Hotel | null;
}

const HotelForm: React.FC<HotelFormProps> = ({ isOpen, onOpenChange, hotel }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: { name: '', location: '', rating: 0, reviews: 0, price: '', original_price: '', image: '', amenities: '' },
  });

  useEffect(() => {
    if (hotel) {
      form.reset({ 
        name: hotel.name,
        location: hotel.location,
        rating: hotel.rating,
        reviews: hotel.reviews,
        price: hotel.price,
        original_price: hotel.original_price,
        image: hotel.image,
        amenities: hotel.amenities.join(', ')
      });
    } else {
      form.reset({ name: '', location: '', rating: 0, reviews: 0, price: '', original_price: '', image: '', amenities: '' });
    }
  }, [hotel, form]);

  const mutation = useMutation({
    mutationFn: async (data: HotelFormData) => {
      const amenitiesArray = data.amenities.split(',').map(s => s.trim());
      
      if (hotel) {
        const updateData = { 
          name: data.name,
          location: data.location,
          rating: data.rating,
          reviews: data.reviews,
          price: data.price,
          original_price: data.original_price,
          image: data.image,
          amenities: amenitiesArray
        };
        const { error } = await supabase.from('hotels').update(updateData).eq('id', hotel.id);
        if (error) throw new Error(error.message);
      } else {
        const insertData: TablesInsert<'hotels'> = {
          name: data.name,
          location: data.location,
          rating: data.rating,
          reviews: data.reviews,
          price: data.price,
          original_price: data.original_price,
          image: data.image,
          amenities: amenitiesArray,
        };
        const { error } = await supabase.from('hotels').insert(insertData);
        if (error) throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      toast({ title: `Hotel ${hotel ? 'updated' : 'added'} successfully!` });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({ title: `Error ${hotel ? 'updating' : 'adding'} hotel`, description: error.message, variant: 'destructive' });
    },
  });

  const onSubmit = (data: HotelFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{hotel ? 'Edit Hotel' : 'Add New Hotel'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register('name')} />
              {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register('location')} />
              {form.formState.errors.location && <p className="text-red-500 text-xs mt-1">{form.formState.errors.location.message}</p>}
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" step="0.1" {...form.register('rating')} />
              {form.formState.errors.rating && <p className="text-red-500 text-xs mt-1">{form.formState.errors.rating.message}</p>}
            </div>
            <div>
              <Label htmlFor="reviews">Reviews</Label>
              <Input id="reviews" type="number" {...form.register('reviews')} />
              {form.formState.errors.reviews && <p className="text-red-500 text-xs mt-1">{form.formState.errors.reviews.message}</p>}
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" {...form.register('price')} />
              {form.formState.errors.price && <p className="text-red-500 text-xs mt-1">{form.formState.errors.price.message}</p>}
            </div>
            <div>
              <Label htmlFor="original_price">Original Price</Label>
              <Input id="original_price" {...form.register('original_price')} />
              {form.formState.errors.original_price && <p className="text-red-500 text-xs mt-1">{form.formState.errors.original_price.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" {...form.register('image')} />
            {form.formState.errors.image && <p className="text-red-500 text-xs mt-1">{form.formState.errors.image.message}</p>}
          </div>
          <div>
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Textarea id="amenities" {...form.register('amenities')} />
            {form.formState.errors.amenities && <p className="text-red-500 text-xs mt-1">{form.formState.errors.amenities.message}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving...' : 'Save Hotel'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HotelForm;
