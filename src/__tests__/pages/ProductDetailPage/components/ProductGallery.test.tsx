import { render, screen, fireEvent } from '@testing-library/react';
import { ProductGallery } from '@/presentation/pages/ProductDetailPage/components/ProductGallery';

describe('ProductGallery', () => {
  const mockPictures = [
    { id: '1', url: 'https://example.com/1.jpg' },
    { id: '2', url: 'https://example.com/2.jpg' },
    { id: '3', url: 'https://example.com/3.jpg' },
  ];

  const mockOnImageSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render main image', () => {
    render(
      <ProductGallery
        pictures={mockPictures}
        thumbnail="https://example.com/thumb.jpg"
        title="iPhone 13"
        selectedImage={{ id: '1', url: 'https://example.com/1.jpg' }}
        onImageSelect={mockOnImageSelect}
      />
    );

    const mainImage = screen.getByAltText('iPhone 13');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', 'https://example.com/1.jpg');
  });

  it('should render thumbnail buttons', () => {
    render(
      <ProductGallery
        pictures={mockPictures}
        thumbnail="https://example.com/thumb.jpg"
        title="iPhone 13"
        selectedImage={{ id: '1', url: 'https://example.com/1.jpg' }}
        onImageSelect={mockOnImageSelect}
      />
    );

    const thumbnails = screen.getAllByRole('button');
    expect(thumbnails).toHaveLength(3);
  });

  it('should call onImageSelect when thumbnail is clicked', () => {
    render(
      <ProductGallery
        pictures={mockPictures}
        thumbnail="https://example.com/thumb.jpg"
        title="iPhone 13"
        selectedImage={{ id: '1', url: 'https://example.com/1.jpg' }}
        onImageSelect={mockOnImageSelect}
      />
    );

    const thumbnails = screen.getAllByRole('button');
    fireEvent.click(thumbnails[1]);

    expect(mockOnImageSelect).toHaveBeenCalledWith({
      id: '2',
      url: 'https://example.com/2.jpg',
    });
  });

  it('should highlight selected image thumbnail', () => {
    const { container } = render(
      <ProductGallery
        pictures={mockPictures}
        thumbnail="https://example.com/thumb.jpg"
        title="iPhone 13"
        selectedImage={{ id: '2', url: 'https://example.com/2.jpg' }}
        onImageSelect={mockOnImageSelect}
      />
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons[1]).toHaveClass('border-blue-500');
  });

  it('should show thumbnail as fallback when selectedImage is empty', () => {
    render(
      <ProductGallery
        pictures={mockPictures}
        thumbnail="https://example.com/thumb.jpg"
        title="iPhone 13"
        selectedImage={null}
        onImageSelect={mockOnImageSelect}
      />
    );

    const mainImage = screen.getByAltText('iPhone 13');
    expect(mainImage).toHaveAttribute('src', 'https://example.com/thumb.jpg');
  });

  it('should limit thumbnails to 4 images', () => {
    const manyPictures = [
      { id: '1', url: 'url1.jpg' },
      { id: '2', url: 'url2.jpg' },
      { id: '3', url: 'url3.jpg' },
      { id: '4', url: 'url4.jpg' },
      { id: '5', url: 'url5.jpg' },
      { id: '6', url: 'url6.jpg' },
    ];

    render(
      <ProductGallery
        pictures={manyPictures}
        thumbnail="thumb.jpg"
        title="Product"
        selectedImage={{ id: '1', url: 'url1.jpg' }}
        onImageSelect={mockOnImageSelect}
      />
    );

    const thumbnails = screen.getAllByRole('button');
    expect(thumbnails).toHaveLength(4);
  });

  it('should have lazy loading on thumbnail images', () => {
    const { container } = render(
      <ProductGallery
        pictures={mockPictures}
        thumbnail="thumb.jpg"
        title="Product"
        selectedImage={{ id: '1', url: 'url1.jpg' }}
        onImageSelect={mockOnImageSelect}
      />
    );

    const thumbnailImages = container.querySelectorAll('button img');
    thumbnailImages.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  it('should open lightbox when main image is clicked', () => {
    render(
      <ProductGallery
        pictures={mockPictures}
        thumbnail="https://example.com/thumb.jpg"
        title="iPhone 13"
        selectedImage={{ id: '1', url: 'https://example.com/1.jpg' }}
        onImageSelect={mockOnImageSelect}
      />
    );

    const mainImageContainer = screen.getByAltText('iPhone 13').parentElement;
    fireEvent.click(mainImageContainer!);

    // Check if lightbox is present (e.g., by checking for the close button)
    const closeButton = screen.getByLabelText('Cerrar lightbox');
    expect(closeButton).toBeInTheDocument();
  });
});
