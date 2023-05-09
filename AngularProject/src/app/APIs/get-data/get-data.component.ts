import { OnInit} from '@angular/core'
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent {
  list: any;
  columnsList: any;

  constructor(public httpClient: HttpClient){
  this.list=[]
}

    getData(sub: string, refreshData: any){
      this.httpClient.get('http://127.0.0.1:3000/'+sub).subscribe((result:any)=>
      {
        refreshData(result)
      })
    }

    postData(sub: string, data: any, refreshData: any){
      this.httpClient.post('http://127.0.0.1:3000/' + sub, data).subscribe({
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
}

