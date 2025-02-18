import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/Task';
import { TaskService } from '../services/task.service';
import { connect } from 'ngxtension/connect';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskRepository {
  private readonly apiService = inject(TaskService);

  public tasks = computed(() => this.state().tasks);
  public completedTasks = computed(() => this.state().tasks.filter((task) => task.completed));
  public incompleteTasks = computed(() => this.state().tasks.filter((task) => !task.completed));
  public selectedTodo = computed(() => this.state().selectedTodo);
  public selectTodo$ = new Subject<number>();
  public updateTask$ = new Subject<Task>();

  private state = signal<TaskState>({
    tasks: [],
    selectedTodo: undefined
  });

  private tasks$ = this.apiService.getAllTasks();
  private updateTaskStream$ = this.updateTask$.pipe(
    switchMap((task) => this.apiService.updateTask(task))
  );

  constructor() {
    connect(this.state)
      .with(this.tasks$.pipe(map((tasks) => ({ tasks }))))
      .with(this.updateTaskStream$.pipe(map((task) => ({
        tasks: this.tasks().map(t => t.id === task.id ? task : t)
      }))))
      .with(this.selectTodo$.pipe(map((id) => ({ selectedTodo: this.tasks().find((task) => task.id === id) }))));
  }
}

interface TaskState {
  tasks: Task[];
  selectedTodo: Task | undefined;
}
