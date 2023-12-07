import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '@app/_models';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PermissionService {
  private permissionSubject: BehaviorSubject<Permission | null>;
  public permission: Observable<Permission | null>;
  constructor(
    private http: HttpClient
  ) {
    this.permissionSubject = new BehaviorSubject<Permission | null>(null);
    this.permission = this.permissionSubject.asObservable();
   }

   public get permissionValue() {
    return this.permissionSubject.value;
   }

   getAll() {
    return this.http.get<Permission>(`${environment.apiUrl}/Account/Permission?isDeep=true&IsOutputTotal=true`);
   }
}
