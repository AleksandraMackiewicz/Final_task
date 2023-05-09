import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GetDataComponent } from '../get-data/get-data.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent extends GetDataComponent {

  private sub = 'boards/:boardId/columns/:columnsId/tasks';
  apiurl: any;
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.apiurl='http://localhost:3000/' //???


  }


handleRefresh( data:any): void {
    this.postData(this.sub, data, this.handleRefresh.bind(this))

  }
}
