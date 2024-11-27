import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    // to be implemented
  }

  updateTask(task: Task){

  }

  deleteTask(id: string){

  }

  getTasks(userId: number){

  }

}
