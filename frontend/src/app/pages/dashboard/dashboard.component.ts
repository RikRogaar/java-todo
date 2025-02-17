import { Component, inject } from '@angular/core';
import { TaskRepository } from '../../services/task.repository';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public taskRepository = inject(TaskRepository);
  public log = console.log.bind(this);
}
