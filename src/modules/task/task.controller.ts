import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import {
  CreateTaskRequestDTO,
  CreateTaskResponseDTO,
  DeleteAndToggleTaskResponseDTO,
  FindAllTasksResponseDTO,
  FindByIdTaskRequestDTO,
  TaskDTO,
} from './task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() data: CreateTaskRequestDTO,
  ): Promise<CreateTaskResponseDTO> {
    const { description } = data;
    return this.taskService.create(description);
  }

  @Get()
  async findAll(): Promise<FindAllTasksResponseDTO> {
    const data: TaskDTO[] = [];
    const tasks = await this.taskService.findAll();

    tasks.forEach((task) => {
      data.push({
        id: task.id,
        done: task.done,
        description: task.description,
        created_at: task.created_at,
      });
    });

    return {
      data,
    };
  }

  @Get(':id')
  async findById(@Param() data: FindByIdTaskRequestDTO): Promise<TaskDTO> {
    const { id } = data;
    const task = await this.taskService.findById(id);

    return {
      id: task.id,
      done: task.done,
      description: task.description,
      created_at: task.created_at,
    };
  }

  @Delete(':id')
  async delete(
    @Param() data: FindByIdTaskRequestDTO,
  ): Promise<DeleteAndToggleTaskResponseDTO> {
    const { id } = data;
    const task = await this.taskService.findById(id);

    await this.taskService.delete(task.id);

    return {
      ok: true,
    };
  }

  @Patch(':id')
  async toggle(
    @Param() { id }: FindByIdTaskRequestDTO,
  ): Promise<DeleteAndToggleTaskResponseDTO> {
    const task = await this.taskService.findById(id);

    await this.taskService.toggle(task.id);

    return {
      ok: true,
    };
  }
}
