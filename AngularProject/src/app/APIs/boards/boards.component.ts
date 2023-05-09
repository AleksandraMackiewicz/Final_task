import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { GetDataComponent } from '../get-data/get-data.component';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent extends GetDataComponent {

  private sub = 'boards';
  apiurl: string;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.apiurl = 'http://localhost:3000/'


  }
  getBoards(refreshData: any) {

    this.httpClient.get(this.apiurl + this.sub).subscribe({
      next: (result: any) => {
        refreshData(result)
      }
    })
  }

  getColumns(id: string, refreshData: any) {
    this.httpClient.get(this.apiurl + this.sub + "/" + id+"/columns").subscribe({
      next: (result: any) => {
        refreshData(result)
      }
    })
  }
  getBoard(id: string, refreshData: any) {
    this.httpClient.get(this.apiurl + this.sub + "/" + id).subscribe({
      next: (result: any) => {
        refreshData(result)
      }
    })
  }
  // 127.0.0.1:4000/tasksSet/6456689376e5a6bc02c16c97
  getTasksForBoard(id: string, refreshData: any) {
    this.httpClient.get(this.apiurl + "tasksSet/" + id).subscribe({
      next: (result: any) => {
        refreshData(result)
      }
    })
  }
  deleteBoard(id: string, refreshData: any) {
    this.httpClient.delete(this.apiurl + this.sub + "/" + id).subscribe({
      next: (result: any) => {
        refreshData(result)
      }
    })
  }
  deleteColumn(board_id: string, column_id:string, refreshData: any) {
    this.httpClient.delete(this.apiurl + this.sub + "/" + board_id + "/columns/" + column_id).subscribe({
      next: (result: any) => {
        refreshData(result)
      }
    })
  }
  deleteTask(board_id: string, column_id:string, task_id:string, refreshData: any) {
    this.httpClient.delete(this.apiurl + this.sub + "/" + board_id + "/columns/" + column_id+"/tasks/"+task_id).subscribe({
      next: (result: any) => {
        refreshData(result)
      }
    })
  }


  postBoard(body: string, data: any, refreshData: any) {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    this.httpClient.post(this.apiurl + 'boards', data, httpOptions).subscribe({
      next: (result: any) => {
        refreshData(result);
      },
      error: (err: any) => {
        // console.log(data)
        // console.log('NOPE')
        // console.error(err);
      },
      complete: () => {
        // console.log('HTTP request completed.');
      },
    });
  }

// check with http://localhost:3000/boards/6456563f4a404374abd88a26/columns
  postColumn(boardId: string, data: any, refreshData: any) {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // console.log("Post column with");
    // console.log(data);
    this.httpClient.post(this.apiurl + 'boards/' + boardId + '/columns', data, httpOptions).subscribe({
      next: (result: any) => {
        refreshData(result);
      },
      error: (err: any) => {
        // console.log(data)
        // console.log('NOPE')
        // console.error(err);
      },
      complete: () => {
        // console.log('HTTP request completed.');
      },
    });
  }



  //"/boards/{boardId}/columns/{columnId}":
  updateColumn(data: any, boardId: string,columnID: string, refreshData: any) {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // console.log("Post column with");
    // console.log(data);
    this.httpClient.put(this.apiurl + 'boards/' + boardId + '/columns/' + columnID , data, httpOptions).subscribe({
      next: (result: any) => {
        if(refreshData) {
          refreshData(result);
        }
      },
      error: (err: any) => {
        // console.log(data)
        // console.log('NOPE')
        // console.error(err);
      },
      complete: () => {
        // console.log('HTTP request completed.');
      },
    });
  }
 // "/boards/{boardId}/columns/{columnId}/tasks/{taskId}": {
  //"http://localhost:3000/boards/6456689376e5a6bc02c16c97/columns/6458cf997a43c826c39039d3/tasks/6458cfa27a43c826c39039d8"
 updateTask(data: any, boardId: string,columnID: string, taskID:string, refreshData: any) {
      const httpOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      // console.log("Post column with");
      // console.log(data);
      this.httpClient.put(this.apiurl + 'boards/' + boardId + '/columns/' + columnID +"/tasks/"+taskID, data, httpOptions).subscribe({
        next: (result: any) => {
          if(refreshData) {
            refreshData(result);
          }
        },
        error: (err: any) => {
          // console.log(data)
          // console.log('NOPE')
          // console.error(err);
        },
        complete: () => {
          // console.log('HTTP request completed.');
        },
      });
    }

  postTask(data: any, boardId: string,columnID: string, refreshData: any) {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // console.log("Post column with");
    // console.log(data);
    this.httpClient.post(this.apiurl + 'boards/' + boardId + '/columns/' + columnID +"/tasks", data, httpOptions).subscribe({
      next: (result: any) => {
        refreshData(result);
      },
      error: (err: any) => {
        // console.log(data)
        // console.log('NOPE')
        // console.error(err);
      },
      complete: () => {
        // console.log('HTTP request completed.');
      },
    });
  }



  handleRefresh() {
    this.getBoards(this.finishRefresh.bind(this))


  }
  finishRefresh(data: any) {
    this.list = data;
  }





}

