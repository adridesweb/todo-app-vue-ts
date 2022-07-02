import { Task } from "@/interfaces/tasks";

export interface TodosState {
  tasks: Task[];
}

function state(): TodosState {
  return {
    tasks: [],
  };
}

export default state;
