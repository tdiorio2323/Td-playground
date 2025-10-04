import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Auth4 from './Auth4';

describe('Auth4 page', () => {
  it('sets document title via side effect', () => {
    render(
      <MemoryRouter>
        <Auth4 />
      </MemoryRouter>
    );
    expect(document.title).toContain('Cabana | Auth');
  });
});

