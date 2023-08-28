export interface Task {
  id: number;
  items: ItemTask[];
  title: string;
  createdDate: Date;
}

export interface ItemTask {
  done: boolean;
  description: string;
}
