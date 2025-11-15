import React from 'react';
import { useLocation } from 'react-router-dom';
import { routes, validateRouteExists } from '@/lib/routes';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const RouteSyncMonitor: React.FC = () => {
  const { pathname } = useLocation();
  
  // Simple validation: check if route exists or is dynamic pattern match
  const isValid = validateRouteExists(pathname) || 
    routes.some(route => 
      route.path.includes(':') && 
      new RegExp(`^${route.path.replace(/:[^/]+/g, '[^/]+')}$`).test(pathname)
    );

  const currentRoute = routes.find(r => r.path === pathname);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/90 border border-gray-700 rounded-lg p-3 text-white text-xs max-w-64">
        <div className="flex items-center gap-2 mb-2">
          {isValid ? (
            <CheckCircle className="w-3 h-3 text-green-400" />
          ) : (
            <AlertTriangle className="w-3 h-3 text-red-400" />
          )}
          <span className="truncate font-mono">{pathname}</span>
        </div>
        
        {currentRoute && (
          <div className="space-y-1">
            <Badge variant="outline" className="text-xs h-5">
              {currentRoute.category}
            </Badge>
            <p className="text-gray-400">{currentRoute.name}</p>
          </div>
        )}
        
        <div className="text-gray-500 text-xs mt-2 pt-2 border-t border-gray-700">
          {routes.length} routes • {isValid ? 'Synced' : 'Missing'}
        </div>
      </div>
    </div>
  );
};

export default RouteSyncMonitor;