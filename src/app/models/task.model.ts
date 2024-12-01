export interface Task {
  _id: string | null;
  userid: string;
  title: string | null;
  description: string | null;
  status: string;
  priority: string | null;
  dueDate: string | null;
  created: string | null;
  lastupdated: string | null;
}