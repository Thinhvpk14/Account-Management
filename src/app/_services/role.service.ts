import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@app/_models';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RoleService {
  private roleSubject: BehaviorSubject<Role | null>;
  public role: Observable<Role | null>;

  constructor(
    private http: HttpClient
  ) {
      this.roleSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('role')!));
      this.role = this.roleSubject.asObservable();
   }

   public get roleValue() {
    return this.roleSubject.value;
}

  getAll() {
    return this.http.get<Role>(`${environment.apiUrl}/Account/Role?isDeep=true&IsOutputTotal=true`);
  }

  insert(role: Role) {
    return this.http.post(`${environment.apiUrl}/Account/Role`, role);
  }

  getById(id: string) {
    return this.http.get<Role>(`${environment.apiUrl}/Account/Role/${id}?isDeep=true`);
  }

  update(id: string, role: Role) {
    return this.http.put(`${environment.apiUrl}/Account/Role/${id}`, role);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/Account/Role/${id}`)
      .pipe(map(x => {
        if (id == this.roleValue?.id) {
          console.log('role is deleted')
        }
        return x;
    }))
  }
}
