import { render, waitFor } from '@testing-library/react';
import { SEO } from '@/presentation/components/SEO/SEO';
import { HelmetProvider } from 'react-helmet-async';

describe('SEO Component', () => {
  it('renders title and meta tags correctly', async () => {
    const title = 'Test Title';
    const description = 'Test Description';

    render(
      <HelmetProvider>
        <SEO title={title} description={description} />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe(title);
      expect(
        document.querySelector('meta[name="description"]')
      ).toHaveAttribute('content', description);
      expect(
        document.querySelector('meta[property="og:title"]')
      ).toHaveAttribute('content', title);
      expect(
        document.querySelector('meta[property="og:description"]')
      ).toHaveAttribute('content', description);
    });
  });

  it('renders with custom name and type', async () => {
    const title = 'Custom Title';
    const description = 'Custom Description';
    const name = 'Custom Name';
    const type = 'article';

    render(
      <HelmetProvider>
        <SEO title={title} description={description} name={name} type={type} />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(
        document.querySelector('meta[property="og:type"]')
      ).toHaveAttribute('content', type);
      expect(
        document.querySelector('meta[name="twitter:creator"]')
      ).toHaveAttribute('content', name);
    });
  });
});
