import { Task } from './task.entity';

export interface TaskGateway {
  create(description: string): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task>;
  toggle(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
