import {
  mockProducts,
  mockProfiles,
  mockUserRoles,
  mockUser,
  mockSession,
  simulateDelay
} from '@/lib/mockData';
import type { Database } from './types';

// Mock Supabase Client
export const createMockSupabaseClient = () => {
  return {
    auth: {
      getSession: async () => {
        await simulateDelay(300);
        return { data: { session: mockSession }, error: null };
      },
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        await simulateDelay(800);
        return { data: { user: mockUser, session: mockSession }, error: null };
      },
      signUp: async ({ email, password }: { email: string; password: string }) => {
        await simulateDelay(800);
        return { data: { user: mockUser, session: mockSession }, error: null };
      },
      signOut: async () => {
        await simulateDelay(300);
        return { error: null };
      },
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        // Simulate initial session
        setTimeout(() => {
          callback('SIGNED_IN', mockSession);
        }, 100);

        return {
          data: {
            subscription: {
              unsubscribe: () => {},
            },
          },
        };
      },
    },
    from: (table: string) => {
      return {
        select: (columns?: string) => {
          const builder = {
            eq: (column: string, value: any) => {
              // Return a new builder that can be awaited or chained
              const eqBuilder = {
                single: async () => {
                  await simulateDelay(300);
                  if (table === 'products') {
                    const product = mockProducts.find((p: any) => p[column] === value);
                    return { data: product || null, error: null };
                  }
                  if (table === 'profiles') {
                    const profile = mockProfiles.find((p: any) => p[column] === value);
                    return { data: profile || null, error: null };
                  }
                  return { data: null, error: null };
                },
                then: async (resolve: Function) => {
                  await simulateDelay(300);
                  let data: any[] = [];

                  if (table === 'products') {
                    data = mockProducts.filter((p: any) => p[column] === value);
                  } else if (table === 'user_roles') {
                    data = mockUserRoles.filter((r: any) => r[column] === value);
                  }

                  const result = { data, error: null };
                  resolve(result);
                  return result;
                },
              };
              return eqBuilder;
            },
            then: async (resolve: Function) => {
              await simulateDelay(300);
              let data: any[] = [];

              if (table === 'products') {
                data = mockProducts;
              } else if (table === 'profiles') {
                data = mockProfiles;
              } else if (table === 'user_roles') {
                data = mockUserRoles;
              }

              const result = { data, error: null };
              resolve(result);
              return result;
            },
          };
          return builder;
        },
        insert: (values: any) => ({
          select: () => ({
            single: async () => {
              await simulateDelay(500);
              const newItem = { ...values, id: `mock-${Date.now()}`, created_at: new Date().toISOString() };

              if (table === 'products') {
                mockProducts.push(newItem);
              } else if (table === 'profiles') {
                mockProfiles.push(newItem);
              }

              return { data: newItem, error: null };
            },
          }),
        }),
        update: (values: any) => ({
          eq: (column: string, value: any) => ({
            select: () => ({
              single: async () => {
                await simulateDelay(500);
                let updatedItem = null;

                if (table === 'products') {
                  const index = mockProducts.findIndex((p: any) => p[column] === value);
                  if (index !== -1) {
                    mockProducts[index] = { ...mockProducts[index], ...values, updated_at: new Date().toISOString() };
                    updatedItem = mockProducts[index];
                  }
                }

                return { data: updatedItem, error: null };
              },
            }),
          }),
        }),
        delete: () => ({
          eq: (column: string, value: any) => ({
            async then(resolve: Function) {
              await simulateDelay(500);

              if (table === 'products') {
                const index = mockProducts.findIndex((p: any) => p[column] === value);
                if (index !== -1) {
                  mockProducts.splice(index, 1);
                }
              }

              resolve({ error: null });
              return { error: null };
            },
          }),
        }),
      };
    },
  };
};

export type MockSupabaseClient = ReturnType<typeof createMockSupabaseClient>;
