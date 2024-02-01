import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {WhatsappMessage} from "../models/whatsapp-message";
import {take, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WhatsappApiHttpService {

  private readonly accessToken: string = 'EAAU1lAkWKWkBOZBfNd6isTDZBkm574ZAhbyGlUg0AsZBt7d6i6CaFC5rBl5KOIjZCTZBTbxOEPDiY2kWvFlb4da8LLEnysxZCZCWbGOkrUwrYZC6G8Qdq0FcxmaZBtyLtHXmsN3xv1CAQDtdwxF8NUWEtosrUOscVPkh5ZAQ4oATljPb1SitlyTqCD7bgtAQjj6h7MU';
  private readonly phoneNumberId: string = '198008493395871';
  private readonly version: string = 'v17.0';
  private readonly code: string = 'es';
  private readonly url: string = `https://graph.facebook.com/${this.version}/${this.phoneNumberId}/messages`;

  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.accessToken)}`
    })
  };

  private _messageW: WhatsappMessage = {
    messaging_product: 'whatsapp',
    to: '',
    type: 'template',
    template: {
      name: '',
      language: {
        code: this.code
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: ''
            },
            {
              type: 'text',
              text: ''
            }
          ]
        }
      ]
    }
  };

  constructor(private http: HttpClient) {
  }

  public sendMessage(phone: string, template: string, days: string, petName: string): void {
    this._messageW.to = phone;
    this._messageW.template.name = template;
    this._messageW.template.components[0].parameters[0].text = days;
    this._messageW.template.components[0].parameters[1].text = petName;

    this.http.post(this.url, JSON.stringify(this._messageW), this._httpOptions)
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: err => console.warn(err)
      });
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
}
