import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenStorageService} from "./token-storage.service";

@Injectable({providedIn: 'root'})
export class FileHttpService {
  private readonly token: string | null = this.tokenStorageService.getToken();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  constructor(private tokenStorageService: TokenStorageService,
              private httpClient: HttpClient) {
  }

  public upload(imageFormData: FormData): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/upload/image/', imageFormData, {observe: "response"})
      .pipe(take(1));
  }

  public getImage(name: string): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/get/image/info/' + name, this.httpOptions)
      .pipe(take(1));
  }
}
