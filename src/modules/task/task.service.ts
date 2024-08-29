import { Injectable } from '@nestjs/common';
import { TaskGateway } from './task.gateway';
import { Task } from './task.entity';
import { PrismaAdapter } from 'src/adapters/prisma.adapter';

@Injectable()
export class TaskService implements TaskGateway {
  constructor(private prisma: PrismaAdapter) {}
  async findById(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      throw new Error('TASK_NOT_FOUND');
    }

    return new Task({
      id: task.id ?? '',
      description: task.description,
      done: task.done,
      created_at: task.createdAt.toISOString(),
      updated_at: task.updatedAt.toISOString(),
    });
  }

  async create(description: string): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        description,
      },
    });

    return new Task({
      id: task.id ?? '',
      description,
      done: task.done,
      created_at: task.createdAt.toISOString(),
      updated_at: task.updatedAt.toISOString(),
    });
  }
  async findAll(): Promise<Task[]> {
    const tasks: Task[] = [];
    const raw = await this.prisma.task.findMany();

    raw.forEach((task) => {
      tasks.push(
        new Task({
          id: task.id ?? '',
          description: task.description,
          done: task.done,
          created_at: task.createdAt.toISOString(),
          updated_at: task.updatedAt.toISOString(),
        }),
      );
    });

    return tasks;
  }
  async toggle(id: string): Promise<void> {
    const task = await this.findById(id);

    await this.prisma.task.update({
      where: {
        id: id,
      },
      data: {
        done: !task.done,
      },
    });
  }
  async delete(id: string): Promise<void> {
    const deleteTask = await this.prisma.task.delete({
      where: {
        id: id,
      },
    });

    if (!deleteTask) {
      throw new Error('TASK_NOT_FOUND');
    }

    return;
  }
}
