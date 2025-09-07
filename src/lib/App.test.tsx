import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the page components to isolate the routing logic
vi.mock('./pages/Index', () => ({ default: () => <div>Index Page</div> }));
vi.mock('./pages/NotFound', () => ({ default: () => <div>Not Found Page</div> }));
vi.mock('./pages/Auth', () => ({ default: () => <div>Auth Page</div> }));
vi.mock('./pages/Shop', () => ({ default: () => <div>Shop Page</div> }));
vi.mock('./pages/Checkout', () => ({ default: () => <div>Checkout Page</div> }));
vi.mock('./pages/Admin', () => ({ default: () => <div>Admin Page</div> }));
vi.mock('./pages/Brand', () => ({ default: () => <div>Brand Page</div> }));
vi.mock('./pages/Portal', () => ({ default: () => <div>Portal Page</div> }));
vi.mock('./pages/ProjectPage', () => ({ default: () => <div>Project Page</div> }));

describe('App Routing', () => {
  // Helper function to render the App with a specific route
  const renderWithRouter = (route: string) => {    
    // The App component uses BrowserRouter internally, but for testing,
    // it's better to wrap it in a MemoryRouter to control the history.
    // The outer router (MemoryRouter) will take precedence.
    return render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>);
  };

  const testRoutes = [
    { path: '/', componentText: 'Index Page', description: 'root' },
    { path: '/auth', componentText: 'Auth Page', description: '/auth' },
    { path: '/auth2', componentText: 'Auth Page', description: '/auth2' },
    { path: '/shop', componentText: 'Shop Page', description: '/shop' },
    { path: '/checkout', componentText: 'Checkout Page', description: '/checkout' },
    { path: '/admin', componentText: 'Admin Page', description: '/admin' },
    { path: '/brand', componentText: 'Brand Page', description: '/brand' },
    { path: '/portal', componentText: 'Portal Page', description: '/portal' },
    { path: '/project/some-id-123', componentText: 'Project Page', description: 'dynamic /project/:id' },
    { path: '/this-route-does-not-exist', componentText: 'Not Found Page', description: 'non-existent' },
  ];

  it.each(testRoutes)(
    'should render the $componentText for the $description route',
    ({ path, componentText }) => {
      renderWithRouter(path);
      expect(screen.getByText(componentText)).toBeInTheDocument();
    }
  );
});
