import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Toaster } from 'sonner';

const CabanaMgmt4: React.FC = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading]);


  if (authLoading || loading) {
    return (
      <div className="container mx-auto mt-4 text-center">
        <p>Loading...</p>
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
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-lg text-center">Cabana management is temporarily disabled.</h2>
      </div>
    </div>
  );
};

export default CabanaMgmt4;