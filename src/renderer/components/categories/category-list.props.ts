export interface ICategoryListProps {
  categories?: Category[];
  delete?: (id: string) => void;
}

interface Category {
  id: string;
  name: string;
}
