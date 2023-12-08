import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { User } from '@app/_models/user';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params, RouterEvent } from '@angular/router';

@Component({ templateUrl: 'view.component.html' })
export class ViewComponent implements OnInit{
    currentUser: any
    userRole: any
    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute) {
        
    }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        this.getUserById(id);
    }
    
    getUserById(id: string) {
        this.accountService.getById(id)
        .pipe(first())
            .subscribe((result: any) => {
                this.currentUser = result
                this.userRole = result.roles.map((userRole: any) => {
                    return userRole
                })
        });
    }
}