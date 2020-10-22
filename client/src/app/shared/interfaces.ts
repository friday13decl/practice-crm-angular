export interface User {
  email: string;
  password: string;
}

export interface Category {
  _id?: string;
  name: string;
  imageSrc?: string;
  user?: string;
}

export interface Position {
  _id?: string;
  name: string;
  cost: number;
  category: string;
  user?: string;
}

export interface OrderItem {
  position_id?: string;
  name: string;
  quantity: number;
  cost: number;
}

export interface Order {
  date?: string;
  order?: number;
  list: Array<OrderItem>;
}

export interface ServerMessage {
  message: string;
}

export interface OrderFilter {
  start?: Date;
  end?: Date;
  order?: number;
}
