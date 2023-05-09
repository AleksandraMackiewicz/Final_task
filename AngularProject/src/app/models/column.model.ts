import { Task } from './task.model';


export class Column {
  constructor(public name:string,public id:string, public tasksObjects: Task[]){

  }

  hasTask(taskID:string)
  {
    for(let i = 0; i < this.tasksObjects.length; i++){
      if(this.tasksObjects[i].id == taskID)
      return true;
    }
    return false;
  }

  postColumn(){

  }
}

