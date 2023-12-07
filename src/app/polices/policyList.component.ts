import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { PolicyService, RoleService } from '@app/_services';
import { Role } from '@app/_models/role';
import { map } from 'rxjs/operators';

@Component({ templateUrl: 'policyList.component.html' })
export class PolicyListComponent implements OnInit {
    polices: any
    constructor(private policyService: PolicyService) {}

    ngOnInit(): void {
        this.policyService.getAll()
            .pipe(first())
            .subscribe((result: any) => 
            {
                this.polices = result.data
            });
    }
    
}