import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  minDate: string;
  dueDateInput: string;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
  ) {}

  ngOnInit(): void {
    // Set the minimum date to today
    this.minDate = new Date().toISOString().split('T')[0];

    // Initialize the due date field for the input, or leave it blank if not set
    this.dueDateInput = this.data.task.dueDate
      ? new Date(this.data.task.dueDate).toISOString().split('T')[0]
      : '';
  }

  onSaveTask(): void {
    // Ensure dueDate is formatted properly
    this.data.task.dueDate = this.dueDateInput ? new Date(this.dueDateInput).toISOString() : '';

    // Set created and lastupdated timestamps
    if (!this.data.task.created) {
      this.data.task.created = new Date().toISOString(); // Set created only if it's a new task
    }
    this.data.task.lastupdated = new Date().toISOString(); // Always update lastupdated timestamp

    // Pass the updated task data back to the parent component
    this.dialogRef.close(this.data.task);
  }

  onNoClick(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}
