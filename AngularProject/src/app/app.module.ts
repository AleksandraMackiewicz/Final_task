import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { LogInComponent } from './subPages/log-in/log-in.component';
import { HomePageComponent } from './subPages/home-page/home-page.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RegisterComponent } from './subPages/register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './APIs/auth/auth.component';
import { GetDataComponent } from './APIs/get-data/get-data.component';
import { BoardsComponent } from './APIs/boards/boards.component'

import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms'
import {ToastrService, ToastrModule} from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomeBoardsComponent } from './subPages/home-boards/home-boards.component';
import { TasksComponent } from './APIs/tasks/tasks.component';

import { MatMenuModule } from '@angular/material/menu';
import { AlertDialogComponent } from './dialog-yes-no/dialog-yes-no.component';
import { ConfirmationDialog } from 'src/app/confirmation-dialog/confirmation-dialog.module';

import { Component, OnInit, Inject, VERSION } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { TaskDialogComponent } from './dialog-task/dialog-task.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LogInComponent,
    HomePageComponent,
    RegisterComponent,
    AuthComponent,
    GetDataComponent,
    BoardsComponent,
    HomeBoardsComponent,
    TasksComponent,
    AlertDialogComponent,
    ConfirmationDialog,
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,

    ToastrModule.forRoot({

    }),
    MDBBootstrapModule.forRoot()
    // RouterModule.forRoot([
    //   {
    //     path: '',
    //     component: HomePageComponent,
    //   },
    //   {
    //     path: 'log-in',
    //     component: LogInComponent
    //   },
    //   {
    //     path: 'register',
    //     component: RegisterComponent
    //   }
    // ])
  ]
  ,
  providers: [AuthComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
