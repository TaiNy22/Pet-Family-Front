export interface Task {
  id: number;
  items: ItemTask[];
  title: string;
  createdDate: Date;
}

export interface ItemTask {
  id?: number;
  done: boolean;
  description: string;
}
