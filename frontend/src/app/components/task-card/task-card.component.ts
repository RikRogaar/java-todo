import { Component, inject, Input } from '@angular/core';
import { Task } from '@interfaces/Task';
import { TaskRepository } from '../../repositories/task.repository';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  private readonly taskRepository = inject(TaskRepository);

  @Input() task!: Task;

  public toggleComplete() {
    this.task.completed = !this.task.completed;

    this.taskRepository.updateTask$.next(this.task);
  }
}
