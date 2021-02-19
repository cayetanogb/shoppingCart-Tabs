import { Product } from "./product";

export interface Pedido {
  id: string;
  total: number;
  productos: Product[];
}
