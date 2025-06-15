
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { MapPin, Calendar, Users, Mail, Phone, Check, X, Clock, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BookingRequest {
  id: string;
  destination: string;
  departure_date: string;
  return_date: string;
  travelers: number;
  email: string;
  phone: string;
  special_requests: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

const fetchBookingRequests = async () => {
  const { data, error } = await supabase
    .from('booking_requests')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data;
};

const BookingManager = () => {
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [viewingRequest, setViewingRequest] = useState<BookingRequest | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['booking-requests'],
    queryFn: fetchBookingRequests
  });

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Booking request marked as ${status}`,
      });

      queryClient.invalidateQueries({ queryKey: ['booking-requests'] });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from('booking_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Request Deleted",
        description: "Booking request has been permanently deleted from the database",
      });

      queryClient.invalidateQueries({ queryKey: ['booking-requests'] });
    } catch (error) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error",
        description: "Failed to delete request",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'confirmed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><X className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading booking requests...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading booking requests</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Booking Requests</h2>
          <p className="text-gray-600">Manage customer booking requests and reservations</p>
        </div>
        <div className="text-sm text-gray-500">
          Total: {requests?.length || 0} requests
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Booking Requests</CardTitle>
          <CardDescription>View and manage customer booking submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Destination</TableHead>
                  <TableHead className="min-w-[120px]">Dates</TableHead>
                  <TableHead className="min-w-[80px]">Travelers</TableHead>
                  <TableHead className="min-w-[200px]">Contact</TableHead>
                  <TableHead className="min-w-[200px]">Special Requests</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Submitted</TableHead>
                  <TableHead className="min-w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                        {request.destination}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-3 h-3 mr-1 text-gray-500" />
                          {new Date(request.departure_date).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500">
                          to {new Date(request.return_date).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-gray-500" />
                        {request.travelers}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <a href={`mailto:${request.email}`} className="text-blue-600 hover:underline flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1" />
                          {request.email}
                        </a>
                        <a href={`tel:${request.phone}`} className="text-blue-600 hover:underline flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          {request.phone}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="max-w-xs truncate text-sm" title={request.special_requests || ''}>
                          {request.special_requests || '-'}
                        </div>
                        {request.special_requests && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setViewingRequest(request as BookingRequest)}
                            className="text-xs p-1 h-6 w-6"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status || 'pending')}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-1">
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(request.id, 'confirmed')}
                              className="text-xs text-green-600 border-green-200 hover:bg-green-50"
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(request.id, 'cancelled')}
                              className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Booking Request</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this booking request for {request.destination}? 
                                This action cannot be undone and will permanently remove the request from the database.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteRequest(request.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Permanently
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {(!requests || requests.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              No booking requests found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Special Requests Viewing Dialog */}
      <AlertDialog open={!!viewingRequest} onOpenChange={() => setViewingRequest(null)}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Special Requests for {viewingRequest?.destination}</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="max-h-96 overflow-y-auto">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {viewingRequest?.special_requests}
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingManager;
