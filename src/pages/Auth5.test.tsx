import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Auth5 from './Auth5';

describe('Auth5 page (/joincabana)', () => {
  it('sets document title via side effect', () => {
    render(
      <MemoryRouter>
        <Auth5 />
      </MemoryRouter>
    );
    expect(document.title).toContain('Cabana | Join');
  });
});

