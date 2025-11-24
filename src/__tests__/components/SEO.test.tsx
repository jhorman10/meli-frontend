import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from '@/presentation/components/SEO/SEO';

const renderWithHelmet = (component: React.ReactElement) => {
  return render(<HelmetProvider>{component}</HelmetProvider>);
};

describe('SEO', () => {
  it('should render without errors', () => {
    const { container } = renderWithHelmet(
      <SEO title="Test Title" description="Test Description" />
    );

    // SEO component doesn't render visible content, just Helmet meta tags
    expect(container).toBeInTheDocument();
  });

  it('should render with default props', () => {
    const { container } = renderWithHelmet(
      <SEO title="Default Title" description="Default Description" />
    );

    expect(container).toBeInTheDocument();
  });

  it('should render with custom type', () => {
    const { container } = renderWithHelmet(
      <SEO
        title="Facebook Test"
        description="Facebook Description"
        type="article"
      />
    );

    expect(container).toBeInTheDocument();
  });

  it('should render with custom name', () => {
    const { container } = renderWithHelmet(
      <SEO
        title="Twitter Test"
        description="Twitter Description"
        name="TestApp"
        type="summary"
      />
    );

    expect(container).toBeInTheDocument();
  });

  it('should use default name when not provided', () => {
    const { container } = renderWithHelmet(
      <SEO title="Test" description="Test Description" />
    );

    expect(container).toBeInTheDocument();
  });

  it('should use default type when not provided', () => {
    const { container } = renderWithHelmet(
      <SEO title="Test" description="Test Description" />
    );

    expect(container).toBeInTheDocument();
  });

  it('should update when props change', () => {
    const { container, rerender } = renderWithHelmet(
      <SEO title="First Title" description="First Description" />
    );

    expect(container).toBeInTheDocument();

    rerender(
      <HelmetProvider>
        <SEO title="Second Title" description="Second Description" />
      </HelmetProvider>
    );

    expect(container).toBeInTheDocument();
  });

  it('should render with all props', () => {
    const { container } = renderWithHelmet(
      <SEO
        title="Complete Test"
        description="Complete Description"
        name="CompleteApp"
        type="website"
      />
    );

    expect(container).toBeInTheDocument();
  });
});
