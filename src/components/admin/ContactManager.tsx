
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Mail, Phone, MessageSquare, Check, X, Clock, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: 'pending' | 'responded' | 'resolved';
  created_at: string;
}

const fetchContactRequests = async () => {
  const { data, error } = await supabase
    .from('contact_requests')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw new Error(error.message);
  return data;
};

const ContactManager = () => {
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [viewingMessage, setViewingMessage] = useState<ContactRequest | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: requests, isLoading, error } = useQuery({
    queryKey: ['contact-requests'],
    queryFn: fetchContactRequests
  });

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_requests')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Contact request marked as ${status}`,
      });

      queryClient.invalidateQueries({ queryKey: ['contact-requests'] });
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
        .from('contact_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Request Deleted",
        description: "Contact request has been permanently deleted from the database",
      });

      queryClient.invalidateQueries({ queryKey: ['contact-requests'] });
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
      case 'responded':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><MessageSquare className="w-3 h-3 mr-1" />Responded</Badge>;
      case 'resolved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading contact requests...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading contact requests</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Requests</h2>
          <p className="text-gray-600">Manage customer inquiries and contact requests</p>
        </div>
        <div className="text-sm text-gray-500">
          Total: {requests?.length || 0} requests
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contact Requests</CardTitle>
          <CardDescription>View and manage customer contact submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Name</TableHead>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[120px]">Phone</TableHead>
                  <TableHead className="min-w-[200px]">Message</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Date</TableHead>
                  <TableHead className="min-w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>
                      <a href={`mailto:${request.email}`} className="text-blue-600 hover:underline flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {request.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      {request.phone ? (
                        <a href={`tel:${request.phone}`} className="text-blue-600 hover:underline flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {request.phone}
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="max-w-xs truncate" title={request.message}>
                          {request.message}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setViewingMessage(request as ContactRequest)}
                          className="text-xs p-1 h-6 w-6"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status || 'pending')}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-1">
                        {request.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(request.id, 'responded')}
                            className="text-xs"
                          >
                            Mark Responded
                          </Button>
                        )}
                        {request.status === 'responded' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(request.id, 'resolved')}
                            className="text-xs"
                          >
                            Mark Resolved
                          </Button>
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
                              <AlertDialogTitle>Delete Contact Request</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this contact request from {request.name}? 
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
              No contact requests found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Viewing Dialog */}
      <AlertDialog open={!!viewingMessage} onOpenChange={() => setViewingMessage(null)}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Full Message from {viewingMessage?.name}</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="max-h-96 overflow-y-auto">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {viewingMessage?.message}
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

export default ContactManager;
