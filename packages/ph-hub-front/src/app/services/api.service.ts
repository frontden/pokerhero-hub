import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '@ph-hub/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.apiUrl}/users`);
  }
}