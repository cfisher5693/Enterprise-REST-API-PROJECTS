import { TagCustom } from "./tag-custom";

export class TodoCustom {
  id!: number;
  name!: string;
  description!: string;
  dueDate!: Date;
  completed!: number;
  tags!: TagCustom;
}
