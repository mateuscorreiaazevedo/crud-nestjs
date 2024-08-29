import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaAdapter } from 'src/adapters/prisma.adapter';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaAdapter],
})
export class TaskModule {}
