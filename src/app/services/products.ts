export interface ProductAttributeVariant {
  id: number;
  name: string;
}

export interface ProductAttribute {
  name: string;
  values: ProductAttributeVariant[];
}
