import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/Task';
import { TaskService } from '../repositories/task.service';
import { connect } from 'ngxtension/connect';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskRepository {
  private readonly apiService = inject(TaskService);

  public tasks = computed(() => this.state().tasks);
  public selectedTodo = computed(() => this.state().selectedTodo);
  public selectTodo$ = new Subject<number>();

  private state = signal<TaskState>({
    tasks: [],
    selectedTodo: undefined
  });

  private tasks$ = this.apiService.getAllTasks();

  constructor() {
    connect(this.state)
      .with(this.tasks$.pipe(map((tasks) => ({ tasks }))))
      .with(this.selectTodo$.pipe(map((id) => ({ selectedTodo: this.tasks().find((task) => task.id === id) }))));
  }
}

interface TaskState {
  tasks: Task[];
  selectedTodo: Task | undefined;
}
