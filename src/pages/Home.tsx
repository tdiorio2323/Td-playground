import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Toaster, toast } from 'sonner';
import { Loader2, Upload, Edit, Trash2 } from 'lucide-react';

interface Cabana {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  created_at: string;
}

const CabanaMgmt4: React.FC = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [cabanas, setCabanas] = useState<Cabana[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCabana, setCurrentCabana] = useState<Cabana | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const fetchCabanas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('cabanas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCabanas(data || []);
    } catch (err: any) {
      console.error('Error fetching cabanas:', err.message);
      setError('Failed to fetch cabanas: ' + err.message);
      toast.error('Failed to fetch cabanas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      // fetchCabanas(); // Temporarily disabled
    }
  }, [user, authLoading, navigate, fetchCabanas]);

  const handleOpenDialog = (cabana?: Cabana) => {
    setCurrentCabana(cabana || null);
    setName(cabana ? cabana.name : '');
    setDescription(cabana ? cabana.description : '');
    setPrice(cabana ? cabana.price : '');
    setImageUrl(cabana ? cabana.image_url : '');
    setImageFile(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCabana(null);
    setName('');
    setDescription('');
    setPrice('');
    setImageFile(null);
    setImageUrl('');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0])); // For preview
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `cabana_images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('cabana-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('cabana-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !description || price === '') {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      } else if (!finalImageUrl) {
        toast.error('Please upload an image or provide an image URL.');
        setLoading(false);
        return;
      }

      const cabanaData = {
        name,
        description,
        price: Number(price),
        image_url: finalImageUrl,
      };

      if (currentCabana) {
        const { error } = await supabase
          .from('cabanas')
          .update(cabanaData)
          .eq('id', currentCabana.id);
        if (error) throw error;
        toast.success('Cabana updated successfully!');
      } else {
        const { error } = await supabase.from('cabanas').insert(cabanaData);
        if (error) throw error;
        toast.success('Cabana added successfully!');
      }
      handleCloseDialog();
      fetchCabanas();
    } catch (err: any) {
      console.error('Error saving cabana:', err.message);
      setError('Failed to save cabana: ' + err.message);
      toast.error('Failed to save cabana.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrlToDelete: string) => {
    if (!window.confirm('Are you sure you want to delete this cabana?')) return;

    setLoading(true);
    setError(null);

    try {
      const urlParts = imageUrlToDelete.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const folderName = urlParts[urlParts.length - 2];
      const filePath = `${folderName}/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('cabana-images')
        .remove([filePath]);

      if (storageError) {
        console.warn('Failed to delete image from storage, proceeding with cabana deletion:', storageError.message);
      }

      const { error: dbError } = await supabase
        .from('cabanas')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast.success('Cabana deleted successfully!');
      fetchCabanas();
    } catch (err: any) {
      console.error('Error deleting cabana:', err.message);
      setError('Failed to delete cabana: ' + err.message);
      toast.error('Failed to delete cabana.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto mt-4 text-center">
        <Loader2 className="animate-spin inline-block" />
        <h2 className="text-lg mt-2">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={fetchCabanas} className="mt-2">Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4 mb-4">
      <Toaster richColors />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Cabana Management
        </h1>
        <div>
          <Button onClick={() => handleOpenDialog()} className="mr-2">
            Add New Cabana
          </Button>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {cabanas.length === 0 ? (
        <h2 className="text-lg text-center">No cabanas found. Add a new one!</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cabanas.map((cabana) => (
            <Card key={cabana.id} className="h-full flex flex-col">
              <CardHeader>
                <img
                  src={cabana.image_url || 'https://via.placeholder.com/200'}
                  alt={cabana.name}
                  className="object-cover h-48 w-full"
                />
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle>{cabana.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{cabana.description}</p>
                <p className="text-lg font-bold mt-2">
                  ${cabana.price ? cabana.price.toFixed(2) : 'N/A'}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end p-2">
                <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(cabana)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(cabana.id, cabana.image_url)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentCabana ? 'Edit Cabana' : 'Add New Cabana'}</DialogTitle>
            <DialogDescription>
              {currentCabana ? 'Edit the details of your cabana.' : 'Add a new cabana to your collection.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className="col-span-3" required step="0.01" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="picture" className="text-right">
                Image
              </Label>
              <div className="col-span-3">
                <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>
            {imageUrl && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-start-2 col-span-3">
                  <img src={imageUrl} alt="Preview" className="w-12 h-12 object-cover rounded" />
                  <p className="text-sm text-muted-foreground">{imageFile ? imageFile.name : 'Current Image'}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {currentCabana ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CabanaMgmt4;
