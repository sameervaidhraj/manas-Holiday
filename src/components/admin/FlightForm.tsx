
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

type Flight = Tables<'flights'>;

const flightSchema = z.object({
  from_city: z.string().min(1, 'From city is required'),
  to_city: z.string().min(1, 'To city is required'),
  from_code: z.string().min(3, 'From code is required').max(3, 'From code must be 3 characters'),
  to_code: z.string().min(3, 'To code is required').max(3, 'To code must be 3 characters'),
  date: z.string().min(1, 'Date is required'),
  price: z.string().min(1, 'Price is required'),
  original_price: z.string().min(1, 'Original price is required'),
  airline: z.string().min(1, 'Airline is required'),
});

type FlightFormData = z.infer<typeof flightSchema>;

interface FlightFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  flight?: Flight | null;
}

const FlightForm: React.FC<FlightFormProps> = ({ isOpen, onOpenChange, flight }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<FlightFormData>({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      from_city: '',
      to_city: '',
      from_code: '',
      to_code: '',
      date: '',
      price: '',
      original_price: '',
      airline: '',
    },
  });

  useEffect(() => {
    if (flight) {
      form.reset({
        from_city: flight.from_city,
        to_city: flight.to_city,
        from_code: flight.from_code,
        to_code: flight.to_code,
        date: flight.date,
        price: flight.price,
        original_price: flight.original_price,
        airline: flight.airline,
      });
    } else {
      form.reset({
        from_city: '', to_city: '', from_code: '', to_code: '', date: '', price: '', original_price: '', airline: '',
      });
    }
  }, [flight, form]);

  const mutation = useMutation({
    mutationFn: async (data: FlightFormData) => {
      if (flight) {
        const { error } = await supabase.from('flights').update(data).eq('id', flight.id);
        if (error) throw new Error(error.message);
      } else {
        const insertData: TablesInsert<'flights'> = {
          from_city: data.from_city,
          to_city: data.to_city,
          from_code: data.from_code,
          to_code: data.to_code,
          date: data.date,
          price: data.price,
          original_price: data.original_price,
          airline: data.airline,
        };
        const { error } = await supabase.from('flights').insert(insertData);
        if (error) throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
      toast({ title: `Flight ${flight ? 'updated' : 'added'} successfully!` });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({ title: `Error ${flight ? 'updating' : 'adding'} flight`, description: error.message, variant: 'destructive' });
    },
  });

  const onSubmit = (data: FlightFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{flight ? 'Edit Flight' : 'Add New Flight'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from_city">From City</Label>
              <Input id="from_city" {...form.register('from_city')} />
              {form.formState.errors.from_city && <p className="text-red-500 text-xs mt-1">{form.formState.errors.from_city.message}</p>}
            </div>
            <div>
              <Label htmlFor="to_city">To City</Label>
              <Input id="to_city" {...form.register('to_city')} />
              {form.formState.errors.to_city && <p className="text-red-500 text-xs mt-1">{form.formState.errors.to_city.message}</p>}
            </div>
            <div>
              <Label htmlFor="from_code">From Code</Label>
              <Input id="from_code" {...form.register('from_code')} />
              {form.formState.errors.from_code && <p className="text-red-500 text-xs mt-1">{form.formState.errors.from_code.message}</p>}
            </div>
            <div>
              <Label htmlFor="to_code">To Code</Label>
              <Input id="to_code" {...form.register('to_code')} />
              {form.formState.errors.to_code && <p className="text-red-500 text-xs mt-1">{form.formState.errors.to_code.message}</p>}
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" {...form.register('date')} />
              {form.formState.errors.date && <p className="text-red-500 text-xs mt-1">{form.formState.errors.date.message}</p>}
            </div>
            <div>
              <Label htmlFor="airline">Airline</Label>
              <Input id="airline" {...form.register('airline')} />
              {form.formState.errors.airline && <p className="text-red-500 text-xs mt-1">{form.formState.errors.airline.message}</p>}
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
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving...' : 'Save Flight'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FlightForm;
