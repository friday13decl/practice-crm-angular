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
  position: Position;
  quantity: number;
  price: number;
}

export interface ServerMessage {
  message: string;
}
