export interface Task {
  id: string | null;
  userid: string;
  title: string | null;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  created: string;
  lastupdated: string;
}