import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskList implements OnInit {

  tasks: any[] = [];
  userId!: number;

  userName: string = '';

  today: string = '';
  searchText: string = '';
  filterStatus: string = 'ALL';

  newTask = {
    title: '',
    description: '',
    dueDate: '',
    status: 'PENDING'
  };

  editingTask: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName'); // ✅ ADDED

    if (!storedUserId) {
      this.router.navigate(['/login']);
      return;
    }

    this.userId = Number(storedUserId);
    this.userName = storedUserName ? storedUserName : 'User'; // ✅ ADDED

    this.today = new Date().toISOString().split('T')[0];
    this.loadTasks();
  }

  loadTasks(): void {
    this.http
      .get<any[]>(`http://localhost:8082/api/tasks/user/${this.userId}`)
      .subscribe({
        next: data => this.tasks = data,
        error: err => console.error(err)
      });
  }

  addTask(): void {
    if (!this.newTask.title || !this.newTask.description || !this.newTask.dueDate) {
      alert('All fields are required');
      return;
    }

    this.http
      .post(`http://localhost:8082/api/tasks/user/${this.userId}`, this.newTask)
      .subscribe(() => {
        this.newTask = {
          title: '',
          description: '',
          dueDate: '',
          status: 'PENDING'
        };
        this.loadTasks();
      });
  }

  editTask(task: any): void {
    this.editingTask = { ...task };
    setTimeout(() => {
      const el = document.getElementById('edit-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  updateTask(): void {
    if (!this.editingTask) return;

    this.http
      .put(
        `http://localhost:8082/api/tasks/${this.editingTask.taskId}`,
        this.editingTask
      )
      .subscribe(() => {
        this.editingTask = null;
        this.loadTasks();
      });
  }

  deleteTask(taskId: number): void {
    if (!confirm('Delete this task?')) return;

    this.http
      .delete(`http://localhost:8082/api/tasks/${taskId}`)
      .subscribe(() => this.loadTasks());
  }

  toggleTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  toggleStatus(task: any): void {
    const updatedTask = { ...task };
    updatedTask.status =
      task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';

    this.http
      .put(`http://localhost:8082/api/tasks/${task.taskId}`, updatedTask)
      .subscribe(() => this.loadTasks());
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getFilteredTasks() {
    return this.tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.filterStatus === 'ALL' || task.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  getTotalTasks(): number {
    return this.tasks.length;
  }

  getCompletedTasks(): number {
    return this.tasks.filter(task => task.status === 'COMPLETED').length;
  }

  getPendingTasks(): number {
    return this.tasks.filter(task => task.status === 'PENDING').length;
  }

  getOverdueTasks(): number {
    return this.tasks.filter(task => this.isOverdue(task.dueDate)).length;
  }

  isOverdue(dueDate: string): boolean {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }

  isDueToday(dueDate: string): boolean {
    return new Date(dueDate).toDateString() === new Date().toDateString();
  }

  isDueTomorrow(dueDate: string): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Date(dueDate).toDateString() === tomorrow.toDateString();
  }
}