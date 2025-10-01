import { mockCreatePaymentIntent, mockConfirmPayment, MockPaymentIntent } from './mockData';

export interface StripeCardElement {
  mount: (element: string | HTMLElement) => void;
  unmount: () => void;
  on: (event: string, handler: Function) => void;
  destroy: () => void;
}

export interface StripeElements {
  create: (type: string, options?: any) => StripeCardElement;
}

export interface MockStripe {
  elements: () => StripeElements;
  createPaymentMethod: (options: {
    type: string;
    card: StripeCardElement;
    billing_details?: any;
  }) => Promise<{
    paymentMethod?: { id: string };
    error?: { message: string };
  }>;
  confirmCardPayment: (
    clientSecret: string,
    options: { payment_method: string }
  ) => Promise<{
    paymentIntent?: MockPaymentIntent;
    error?: { message: string };
  }>;
}

export const createMockStripe = (): MockStripe => {
  const createMockCardElement = (): StripeCardElement => ({
    mount: (element) => {
      console.log('[Mock Stripe] Card element mounted');
    },
    unmount: () => {
      console.log('[Mock Stripe] Card element unmounted');
    },
    on: (event, handler) => {
      console.log(`[Mock Stripe] Event listener added: ${event}`);
      // Simulate ready event
      if (event === 'ready') {
        setTimeout(() => handler(), 100);
      }
    },
    destroy: () => {
      console.log('[Mock Stripe] Card element destroyed');
    },
  });

  return {
    elements: () => ({
      create: (type, options) => {
        console.log(`[Mock Stripe] Creating element: ${type}`);
        return createMockCardElement();
      },
    }),
    createPaymentMethod: async (options) => {
      console.log('[Mock Stripe] Creating payment method');
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        paymentMethod: {
          id: `pm_mock_${Date.now()}`,
        },
      };
    },
    confirmCardPayment: async (clientSecret, options) => {
      console.log('[Mock Stripe] Confirming card payment');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful payment
      return {
        paymentIntent: {
          id: `pi_mock_${Date.now()}`,
          amount: 0,
          currency: 'usd',
          status: 'succeeded',
          client_secret: clientSecret,
        },
      };
    },
  };
};

// Mock Stripe API for server-side operations
export const mockStripeAPI = {
  createPaymentIntent: mockCreatePaymentIntent,
  confirmPayment: mockConfirmPayment,
};

export default createMockStripe;
