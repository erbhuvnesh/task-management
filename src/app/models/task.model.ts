export interface Task {
  id: string | null;
  userid: string;
  title: string | null;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date;
  created: Date;
  lastupdated: Date;
}