export interface Task<T> {
  id: string;
  uid: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'backlog' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: T;
  updatedAt: T;
}
