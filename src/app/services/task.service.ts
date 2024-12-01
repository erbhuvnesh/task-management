import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  // Add a new task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Update an existing task
  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task._id}`;
    return this.http.put<Task>(url, task);
  }

  // Delete a task by ID
  deleteTask(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // Get tasks by user ID
  getTasks(userId: string): Observable<Task[]> {
    const url = `${this.apiUrl}?userId=${userId}`;
    return this.http.get<Task[]>(url);
  }

  // Get list of all existing titles to validate
  getTitlesList(): Observable<string[]>{
    return this.http.get<string[]>(this.apiUrl+'/all');
  }
}
