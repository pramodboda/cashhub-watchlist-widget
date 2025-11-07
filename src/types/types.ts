export interface Asset {
    id: string;
    symbol: string;
    name: string;
    type?: string;
    tags?: string[];
  }

  export interface SortableAssetItemProps {
    item: Asset;
    onDelete: (id: string) => void;
  }