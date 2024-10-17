export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface Discount {
  id: string;
  rule: {
    value: number;
    conditions: {
      products: string[];
    }[];
  };
  starts_at: string;
  ends_at: string;
}
