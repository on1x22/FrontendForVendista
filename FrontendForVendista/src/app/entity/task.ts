import { TypeInfo } from "./TypeInfo";

export class Task {
  page_number!: number;
  items_per_page!: number;
  items_count!: number;
  items!: TypeInfo[];
  success!: boolean;
}
