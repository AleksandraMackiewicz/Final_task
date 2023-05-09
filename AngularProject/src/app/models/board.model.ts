import { Column } from './column.model';

export class Board {
  findColumnForID(columnId: string): any {
    for(let i = 0; i < this.columns.length; i++){
      if(this.columns[i].id == columnId)
      return this.columns[i];
    }
    return undefined;
  }
  findColumnForTaskID(taskID: string): any {
    for(let i = 0; i < this.columns.length; i++){
      if(this.columns[i].hasTask(taskID))
      {
          return this.columns[i].id;
      }
    }
    return "undefined";
  }
  
  constructor(public name: string, public columns: Column[]){}
}
