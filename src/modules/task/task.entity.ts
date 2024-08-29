import { z } from 'zod';

export interface TaskInterface {
  id?: string;
  description: string;
  done: boolean;
  created_at: string;
  updated_at: string;
}

export class Task {
  private Id?: string;
  private Description: string;
  private Done: boolean;
  private CreatedAt: string;
  private UpdatedAt: string;

  constructor(data: TaskInterface) {
    if (!!data.id && !this.validateID(data.id).success) {
      throw new Error(this.validateID(data.id).message);
    }
    if (!this.validateDescription(data.description).success) {
      throw new Error(this.validateDescription(data.description).message);
    }
    if (!this.validateDone(data.done).success) {
      throw new Error(this.validateDone(data.done).message);
    }
    if (!this.validateCreatedAt(data.created_at).success) {
      throw new Error(this.validateCreatedAt(data.created_at).message);
    }
    if (!this.validateUpdatedAt(data.updated_at).success) {
      throw new Error(this.validateUpdatedAt(data.updated_at).message);
    }

    this.Id = data.id;
    this.Description = data.description;
    this.Done = data.done;
    this.CreatedAt = data.created_at;
    this.UpdatedAt = data.updated_at;
  }

  get id(): string | undefined {
    return this.Id;
  }

  get description(): string {
    return this.Description;
  }

  get done(): boolean {
    return this.Done;
  }

  get created_at(): string {
    return this.CreatedAt;
  }

  get updated_at(): string {
    return this.UpdatedAt;
  }

  private validateID(id: string): ReturnZod {
    const validate = z.string().uuid('INVALID_UUID_FORMAT');

    return {
      success: validate.safeParse(id).success,
      message: validate.safeParse(id).error?.errors[0].message,
    };
  }

  private validateDescription(description: string): ReturnZod {
    const validate = z.string().min(3, 'DESCRIPTION_SHORT');

    return {
      success: validate.safeParse(description).success,
      message: validate.safeParse(description).error?.errors[0].message,
    };
  }

  private validateDone(done: boolean): ReturnZod {
    const validate = z.boolean();

    return {
      success: validate.safeParse(done).success,
      message: validate.safeParse(done).error?.errors[0].message,
    };
  }

  private validateCreatedAt(created_at: string): ReturnZod {
    const validate = z.string().datetime('INVALID_DATETIME_FORMAT');

    return {
      success: validate.safeParse(created_at).success,
      message: validate.safeParse(created_at).error?.errors[0].message,
    };
  }

  private validateUpdatedAt(updated_at: string): ReturnZod {
    const validate = z.string().datetime('INVALID_DATETIME_FORMAT');

    return {
      success: validate.safeParse(updated_at).success,
      message: validate.safeParse(updated_at).error?.errors[0].message,
    };
  }
}
