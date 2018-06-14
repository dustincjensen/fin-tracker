export interface ITabsProps {
  tabs: ITab[];
  selectTab: (id: string) => void;
}

export interface ITab {
  id: string;
  display: string;
  active?: boolean;
}
