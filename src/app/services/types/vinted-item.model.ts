export interface VintedItem {
  id: number;
  title: string;
  size: string;
  description?: string;
  price: number;
  priceWithShipping: number;
  sauce: string;
  link: string;
  vintedItemUrls: string[];
  sauceUrls: string[];
  dayId: number;
  createdAt: string;
}

export type VintedItemPayload = Omit<VintedItem, 'id' | 'createdAt'>;
