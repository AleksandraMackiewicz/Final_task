import { CdkDrag } from '@angular/cdk/drag-drop';

//export class Task extends CdkDrag {
 export class Task {
    constructor(public title: string, public id: string, public previousColumnID:string) {
    } 
  }
  