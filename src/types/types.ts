export type ItemCardObject = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  createdAt: Date;
};

export interface User {
  username: string;
  //password: string;
}
