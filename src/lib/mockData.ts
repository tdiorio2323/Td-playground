import { Tables } from '@/integrations/supabase/types';

// Mock Products
export const mockProducts: Tables<'products'>[] = [
  {
    id: '1',
    name: 'Premium Product 1',
    price: 2999,
    description: 'High-quality premium product with excellent features',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    is_active: true,
    stock_quantity: 50,
    brand_id: 'brand-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Luxury Item 2',
    price: 4999,
    description: 'Luxury item crafted with attention to detail',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Fashion',
    is_active: true,
    stock_quantity: 30,
    brand_id: 'brand-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Essential Product 3',
    price: 1999,
    description: 'Everyday essential that you cannot live without',
    image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'Home',
    is_active: true,
    stock_quantity: 100,
    brand_id: 'brand-2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Tech Gadget 4',
    price: 7999,
    description: 'Latest technology innovation for modern lifestyle',
    image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    category: 'Electronics',
    is_active: true,
    stock_quantity: 25,
    brand_id: 'brand-2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Artisan Collection 5',
    price: 5999,
    description: 'Handcrafted artisan piece with unique character',
    image_url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500',
    category: 'Fashion',
    is_active: true,
    stock_quantity: 15,
    brand_id: 'brand-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Home Comfort 6',
    price: 3499,
    description: 'Comfort meets style in this home essential',
    image_url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
    category: 'Home',
    is_active: true,
    stock_quantity: 60,
    brand_id: 'brand-2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Smart Watch Pro',
    price: 8999,
    description: 'Advanced fitness tracking with premium design',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    is_active: true,
    stock_quantity: 35,
    brand_id: 'brand-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Designer Sunglasses',
    price: 6499,
    description: 'Premium eyewear with UV protection and style',
    image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'Fashion',
    is_active: true,
    stock_quantity: 45,
    brand_id: 'brand-2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock Profiles
export const mockProfiles: Tables<'profiles'>[] = [
  {
    id: 'profile-1',
    user_id: 'user-1',
    display_name: 'John Doe',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'profile-2',
    user_id: 'user-2',
    display_name: 'Jane Smith',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock User Roles
export const mockUserRoles: Tables<'user_roles'>[] = [
  {
    id: 'role-1',
    user_id: 'user-1',
    role: 'admin',
    created_at: new Date().toISOString(),
  },
  {
    id: 'role-2',
    user_id: 'user-2',
    role: 'customer',
    created_at: new Date().toISOString(),
  },
];

// Mock User for Auth
export const mockUser = {
  id: 'user-1',
  email: 'demo@cabana.vip',
  user_metadata: {
    display_name: 'Demo User',
  },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
};

// Mock Session
export const mockSession = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Date.now() / 1000 + 3600,
  token_type: 'bearer',
  user: mockUser,
};

// Helper to simulate API delay
export const simulateDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

// Mock Stripe Payment
export interface MockPaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'processing' | 'failed';
  client_secret: string;
}

export const mockCreatePaymentIntent = async (amount: number): Promise<MockPaymentIntent> => {
  await simulateDelay(800);
  return {
    id: `pi_mock_${Date.now()}`,
    amount,
    currency: 'usd',
    status: 'succeeded',
    client_secret: `mock_client_secret_${Date.now()}`,
  };
};

export const mockConfirmPayment = async (paymentIntentId: string): Promise<{ success: boolean }> => {
  await simulateDelay(1000);
  return { success: true };
};
