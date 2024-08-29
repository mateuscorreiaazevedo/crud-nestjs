export interface CreateTaskRequestDTO {
  description: string;
}

export interface CreateTaskResponseDTO {
  id: string;
  done: boolean;
  description: string;
  created_at: string;
}

export interface TaskDTO {
  id: string;
  done: boolean;
  description: string;
  created_at: string;
}

export interface FindAllTasksResponseDTO {
  data: TaskDTO[];
}

export interface FindByIdTaskRequestDTO {
  id: string;
}

export interface DeleteAndToggleTaskResponseDTO {
  ok: boolean;
}
