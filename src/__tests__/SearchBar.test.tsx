import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '@/presentation/components/SearchBar/SearchBar';

describe('SearchBar component', () => {
  test('renders with placeholder and allows typing', () => {
    const handleSearch = jest.fn();
    render(
      <SearchBar onSearch={handleSearch} placeholder="Buscar productos" />
    );

    const input = screen.getByPlaceholderText(
      'Buscar productos'
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'iPhone' } });
    expect(input.value).toBe('iPhone');
  });

  test('calls onSearch when submit button is clicked', () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'iPhone' } });
    const button = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(button);
    expect(handleSearch).toHaveBeenCalledWith('iPhone');
  });
});
