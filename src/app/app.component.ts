import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'file-upload';
  selectedFile: any;
  fileName = '';
  constructor(public openService: OpenService) {

     }
  
  ngOnInit(): void {
  }

  onFileSelected(target: any ) {
    let files = (target as HTMLInputElement).files
    if(files){
      this.selectedFile = files.item(0);
      this.fileName = this.selectedFile.name
    }
  }

  submitFile() {
    const uploadFormData = new FormData();

    uploadFormData.append("thumbnail", this.selectedFile);

    this.openService.postFile(`upload`, uploadFormData)
      .subscribe(
        () => {

        },
      error => {
        console.log(error);
      });
  }
}


@Injectable({
  providedIn: 'root'
})
export class OpenService {

  constructor(private http: HttpClient) { }

  getBaseUrl(): any {
    return 'http://localhost:8000'
  }

  getClientUrl(): any {
    return 'http://localhost:4200'
  }

  getHeaders() {
    let headers = new HttpHeaders();
    return headers;
  }

  private handleError(error: any) {
    /* let errMsg = (error.message) ? error.message :
     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
     console.error(error); */ // log to console instead
    console.debug(error);
    return throwError(error);
  }

  postFile(path: string, obj: any) {
    const url = `${this.getBaseUrl()}/${path}`;
    let headers = this.getHeaders();
    return this.http
      .post(url, obj, { headers: headers })
      .pipe(catchError(this.handleError));
  }
}
