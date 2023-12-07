import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from '@app/_models';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PolicyService {
  private policySubject: BehaviorSubject<Policy | null>;
  public policy: Observable<Policy | null>;

  constructor(
    private http: HttpClient
  ) { 
    this.policySubject = new BehaviorSubject<Policy | null>(null);
    this.policy = this.policySubject.asObservable();
  }

  public get policyValue() {
    return this.policySubject.value;
  }

  getAll() {
    return this.http.get<Policy>(`${environment.apiUrl}/Account/PermissionSet?isDeep=true&IsOutputTotal=true`);
  }
}
