export interface Project<T> {
  id: string;
  index?: number;
  title: string;
  description: string;
  uid: string;
  contributors?: string[];
  createdAt: T;
  updatedAt?: T;
}
