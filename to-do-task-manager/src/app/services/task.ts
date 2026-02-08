import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8082/api/tasks';

  constructor(private http: HttpClient) {}


  getTasksByUser(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/user/${userId}`);
  }

  addTask(
    userId: number,
    task: { title: string; description: string; dueDate: string }
  ): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/user/${userId}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}


