import { useNavigate } from 'react-router-dom';

export const useSearchPage = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${query}`);
  };

  return {
    handleSearch,
  };
};
