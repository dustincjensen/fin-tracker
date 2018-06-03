export default interface TabsProps {
  tabs: Tab[];
  selectTab: (id: number) => void;
}

interface Tab {
  id: number;
  display: string;
  active?: boolean;
}
