import { MatToolbar } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop'

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Task } from 'src/app/models/task.model';
import { AlertDialogComponent } from 'src/app/dialog-yes-no/dialog-yes-no.component';
import { Column } from 'src/app/models/column.model';
import { BoardsComponent } from 'src/app/APIs/boards/boards.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'
import { ConfirmationDialog } from 'src/app/confirmation-dialog/confirmation-dialog.module';
import { Component, OnInit, Inject, VERSION } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import {  TaskDialogComponent } from 'src/app/dialog-task/dialog-task.component';

@Component({
  selector: 'home-boards',
  templateUrl: './home-boards.component.html',
  styleUrls: ['./home-boards.component.scss']
})
export class HomeBoardsComponent extends BoardsComponent {
  task: string = '';
  board_name = 'menu';
  board_title: string = '';
  board_user: string = '';
  boardId: string = '';
  version = VERSION;

  boardFormShown : boolean = false;
  columnFormShown  : boolean = false;

  constructor(httpClient: HttpClient, private toastr: ToastrService,private dialog: MatDialog,
    private snackBar: MatSnackBar){
    super(httpClient)
    this.handleRefreshIterate();


  }
  showCreateColumn(){

    const dialogRef = this.dialog.open(TaskDialogComponent,{
      data:{
        message: 'Enter new column data:',
        buttonText: {
          ok: 'Create',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      let nameStr = dialogRef.componentInstance.nameStr;
      let titleStr = dialogRef.componentInstance.titleStr;
      if (confirmed) {
        if(nameStr.length < 1) {
          this.toastr.warning("Column name too short!");
        } else {
          this.addColumn(nameStr);
          this.toastr.success("Column added!");
        }
      } else {
        this.toastr.info("Column canceled.");
      }
    });
  }
  setColumnName(b_id:string, col_id:string, col_name:string){
    let data = {
      title: col_name,
      order: 0
    }
    this.updateColumn(data, b_id,col_id, this.handleRefreshColumns.bind(this))
  }
  setTaskName(b_id:string, col_id:string, tsk_id:string, tsk_name:string){
    let data = {
      title: tsk_name,
      order: "1",
      description: "Test",
      userId: "test",
      users: "",
      columnId: col_id
    }
    this.updateTask(data, b_id,col_id,tsk_id, this.handleRefreshColumns.bind(this))
  }
  onClickedEditTask(col_id:string, task:Task){

    const dialogRef = this.dialog.open(TaskDialogComponent,{
      data:{
        message: 'Here you can edit task:',
        buttonText: {
          ok: 'Save',
          cancel: 'Cancel'
        }
      }
    });
     dialogRef.componentInstance.nameStr = task.title;

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      let nameStr = dialogRef.componentInstance.nameStr;
      let titleStr = dialogRef.componentInstance.titleStr;
      if (confirmed) {
        if(nameStr.length < 1) {
          this.toastr.warning("Task name too short!");
        } else {
          this.setTaskName(this.boardId, col_id, task.id, nameStr);
          this.toastr.success("edit task saved!");
        }
      } else {
        this.toastr.info("Edit task canceled.");
      }
    });
  }
  editColumnTitle(col:Column){

    const dialogRef = this.dialog.open(TaskDialogComponent,{
      data:{
        message: 'Here you can edit column name:',
        buttonText: {
          ok: 'Create',
          cancel: 'Cancel'
        }
      }
    });
     dialogRef.componentInstance.nameStr = col.name;

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      let nameStr = dialogRef.componentInstance.nameStr;
      let titleStr = dialogRef.componentInstance.titleStr;
      if (confirmed) {
        if(nameStr.length < 1) {
          this.toastr.warning("column name too short!");
        } else {
          this.setColumnName(this.boardId, col.id, nameStr);
          this.toastr.success("Edit column saved!");
        }
      } else {
        this.toastr.info("Edit column canceled.");
      }
    });
  }
  showCreateBoard(){

    const dialogRef = this.dialog.open(TaskDialogComponent,{
      data:{
        message: 'Enter new board data:',
        buttonText: {
          ok: 'Create',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      let nameStr = dialogRef.componentInstance.nameStr;
      let titleStr = dialogRef.componentInstance.titleStr;
      if (confirmed) {
        if(nameStr.length < 1) {
          this.toastr.warning("Board name too short!");
        } else {
          this.addBoard(nameStr);
          this.toastr.success("Board added!");
        }
      } else {
        this.toastr.info("Board canceled.");
      }
    });
  }
  handleRefreshIterate( ) {
    this.getBoards(this.finishRefreshIterate.bind(this))
  }
  handleRefreshColumns( ) {
    this.getColumns(this.boardId,this.finishRefreshColumns.bind(this))
  }
  finishRefreshIterate(data: any) {
    this.list = data
    if(this.list.length > 0) {
    }
  }
  finishRefreshColumns(data: any) {
    this.columnsList = data

    this.board.columns = new Array(0);
    for(let i = 0; i < this.columnsList.length; i++){
      let c = this.columnsList[i];
      let nc = new Column(c.title,c._id,[]);
      this.board.columns.push(nc);
    }
    this.handleRefreshTasks();
  }
  handleRefreshTasks( ) {

    this.getTasksForBoard(this.boardId,this.finishRefreshTasks.bind(this))
  }
  finishRefreshTasks(data: any) {

    // match tasks to columns...
    for(let i = 0; i < data.length; i++)
    {
        let d = data[i];
        // match to columns
        for(let j = 0; j < this.board.columns.length; j++)
        {
           let c = this.board.columns[j];
           if(c.id == d.columnId)
           {
              let nt = new Task(d.title,d._id, d.columnId);
              c.tasksObjects.push(nt);
           }
        }

    }

  }

  board: Board = new Board('None',[
  /*  new Column('ideas','t',[

    ]),
    new Column('doing', 't',[

    ]),
    new Column("todo",'t',[


    ]),
    new Column('done','t',[

    ]),
*/
  ])


  getColumnFromElement(element: any): Column {

    // Use the element's ID to find the corresponding Column object
    const columnId = element.id;

   // return this.board.columns.find(column => column.id === columnId);
   return this.board.findColumnForID(columnId);
  }
  drop(event: CdkDragDrop<Task[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.saveTasks();
  }
  saveTasks() {
     for(let i = 0; i < this.board.columns.length;i++){
      let col = this.board.columns[i];
      for(let j = 0; j < col.tasksObjects.length; j++){
          let task = col.tasksObjects[j];
          let data = {
            title: task.title,
            order: "1",
            description: "Test",
            userId: "test",
            users: "",
            columnId: col.id
          }
          this.updateTask(data,this.boardId, task.previousColumnID, task.id,undefined);
      }
     }
  }
  addBoard(board_title : string){


    let board_user = "";
    let board_owner = sessionStorage.getItem("login");
    let data = {
     title: board_title,
     owner: board_owner,
     users: board_user
    }


    this.postBoard('boards', data , this.onBoardAdded.bind(this)) // I dont know shuld i put add button in every column?

  }
  onBoardAdded(res:any){
    this.showBoardForm(false);
    this.handleRefresh();
  }
  showBoardFormToggle() {
    this.showBoardForm(!this.boardFormShown);
  }
  showBoardForm(bOn : boolean){
    this.boardFormShown = bOn;
  }
  showColumnForm(bOn : boolean){
    this.columnFormShown = bOn;
  }


  handleRefreshBoard(res: any) {
   this.handleRefreshColumns();
   this.board.name =  res.title;

  }
  onClickChangeBoard(id: string){

    this.getBoard(id, this.handleRefreshBoard.bind(this))
    this.boardId = id;
  }
  onClickDeleteBoard(id: string){
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Are you sure want to delete a board?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.deleteBoard(id, this.handleRefresh.bind(this))
        this.toastr.info("Board deleted!");
      } else {
        this.toastr.info("Delete canceled.");
      }
    });
  }



  addColumn(title: string){

    let data = {
      title: title,
      order: 0
     }

    this.postColumn(this.boardId,data, this.handleRefreshColumns.bind(this))

  }

  findColumnForTask(taskID:string){
    return this.board.findColumnForTaskID(taskID);
  }
// "/boards/{boardId}/columns/{columnId}/tasks/{taskId}": {
  onClickedDeleteTask(task:Task){

    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Are you sure want to delete a task?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {

        let taskID = task.id;

        let columnID = this.findColumnForTask(taskID);
        this.deleteTask(this.boardId, columnID, taskID, this.handleRefreshColumns.bind(this))
        this.toastr.info("Task deleted!");
      } else {
        this.toastr.info("Delete canceled.");
      }
    });

  }

  onClickedDeleteColumn(columnID:string){

    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Are you sure want to delete a column?',
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.deleteColumn(this.boardId, columnID, this.handleRefreshColumns.bind(this))
      } else {
        this.toastr.info("Delete canceled.");
      }
    });
  }


  addTaskActivate(){

  }

  addTask(columnID:string, taskText:string){

    if(taskText.length < 1) {

      this.toastr.warning("Task name too short.");
      return;
    }

    let data = {
      title: taskText,
      order: "1",
      description: "Test",
      userId: "test",
      users: ""
     }
    this.postTask(data,this.boardId,columnID, this.handleRefreshColumns.bind(this))
    this.toastr.info("Task added.");
  }

}

