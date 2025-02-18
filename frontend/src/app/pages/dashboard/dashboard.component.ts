import { Component, inject } from '@angular/core';
import { TaskRepository } from 'src/app/repositories/task.repository';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '@components/task-card/task-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TaskCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public taskRepository = inject(TaskRepository);
  public log = console.log.bind(this);
}
