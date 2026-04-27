export interface Product {
  id: string;
  name: string;
  category: string;
  material: string;
  price: number;
  image: string;
  isWide?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
