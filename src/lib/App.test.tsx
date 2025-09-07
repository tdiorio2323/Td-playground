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

  it('should render the Index page for the root route', () => {
    renderWithRouter('/');
    expect(screen.getByText('Index Page')).toBeInTheDocument();
  });

  it('should render the Auth page for the /auth route', () => {
    renderWithRouter('/auth');
    expect(screen.getByText('Auth Page')).toBeInTheDocument();
  });

  it('should render the Auth page for the /auth2 route', () => {
    renderWithRouter('/auth2');
    expect(screen.getByText('Auth Page')).toBeInTheDocument();
  });

  it('should render the Shop page for the /shop route', () => {
    renderWithRouter('/shop');
    expect(screen.getByText('Shop Page')).toBeInTheDocument();
  });

  it('should render the Checkout page for the /checkout route', () => {
    renderWithRouter('/checkout');
    expect(screen.getByText('Checkout Page')).toBeInTheDocument();
  });

  it('should render the Admin page for the /admin route', () => {
    renderWithRouter('/admin');
    expect(screen.getByText('Admin Page')).toBeInTheDocument();
  });

  it('should render the Brand page for the /brand route', () => {
    renderWithRouter('/brand');
    expect(screen.getByText('Brand Page')).toBeInTheDocument();
  });

  it('should render the Portal page for the /portal route', () => {
    renderWithRouter('/portal');
    expect(screen.getByText('Portal Page')).toBeInTheDocument();
  });

  it('should render the ProjectPage for a dynamic /project/:id route', () => {
    renderWithRouter('/project/some-id-123');
    expect(screen.getByText('Project Page')).toBeInTheDocument();
  });

  it('should render the NotFound page for a non-existent route', () => {
    renderWithRouter('/this-route-does-not-exist');
    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
  });
});
