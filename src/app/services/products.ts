export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  images: string[];
}

export interface ProductAttributeVariant {
  id: number;
  name: string;
}

export interface ProductAttribute {
  name: string;
  values: ProductAttributeVariant[];
}
