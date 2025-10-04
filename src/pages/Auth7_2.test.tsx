import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Auth7_2 from './Auth7_2';

describe('Auth7_2 page', () => {

  it('renders heading and first slide', () => {
    render(
      <MemoryRouter>
        <Auth7_2 />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /star luv/i })).toBeInTheDocument();
    expect(screen.getByAltText(/slide 1/i)).toBeInTheDocument();
  });

  it('advances slideshow on interval', () => {
    const setIntervalSpy = vi
      .spyOn(window, 'setInterval')
      .mockImplementation((handler: TimerHandler): number => {
        if (typeof handler === 'function') handler();
        return 1 as unknown as number;
      });

    render(
      <MemoryRouter>
        <Auth7_2 />
      </MemoryRouter>
    );

    // After immediately-invoked interval callback, slide index should be 2
    expect(screen.getByAltText(/slide 2/i)).toBeInTheDocument();

    setIntervalSpy.mockRestore();
  });

  it('opens OnlyFans in a new tab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null as any);
    render(
      <MemoryRouter>
        <Auth7_2 />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /only fans/i }));
    expect(openSpy).toHaveBeenCalledWith('https://onlyfans.com/xostarluv', '_blank');
    openSpy.mockRestore();
  });
});
