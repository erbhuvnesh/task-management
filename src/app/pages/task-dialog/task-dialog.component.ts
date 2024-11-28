// src/app/pages/task-dialog/task-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  taskTypes: string[] = [];
  minDate : string;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.minDate = new Date().toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
  }



  onSaveTask(): void {
    this.dialogRef.close(this.data.task);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
