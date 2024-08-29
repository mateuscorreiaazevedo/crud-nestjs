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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('task')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro de servidor' })
  async create(
    @Body() data: CreateTaskRequestDTO,
  ): Promise<CreateTaskResponseDTO> {
    const { description } = data;
    return this.taskService.create(description);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todas as tarefas' })
  @ApiResponse({ status: 200, description: 'Tarefas encontradas com sucesso' })
  @ApiResponse({ status: 500, description: 'Erro de servidor' })
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
  @ApiOperation({ summary: 'Retorna uma tarefa por id' })
  @ApiResponse({ status: 200, description: 'Tarefa encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro de servidor' })
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
  @ApiOperation({ summary: 'Deleta uma tarefa por id' })
  @ApiResponse({ status: 200, description: 'Tarefa deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro de servidor' })
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
  @ApiOperation({ summary: 'Ativa/desativa uma tarefa por id' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa ativada/desativada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro de servidor' })
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
