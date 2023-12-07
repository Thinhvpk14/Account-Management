import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { User } from '@app/_models/user';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Role } from '@app/_models';

@Component({ 
    templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users: any
    id?: string
    roles: any
    totalRecords?: number;
    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.getAllUser()
        
    }
    
    getAllUser () {
        this.accountService.getAll()
                .pipe(first())
                .subscribe((result: any) => {
                    console.log(result)
                    this.users = result.data
                    this.roles = this.users.map((user: any) => {
                        return user.roles.map((role: any) => role);
                      });
                
                      console.log(this.roles);
                });
    }

    getUserById(id: string) {      
        this.accountService.getById(id)
            .pipe(first())
            .subscribe((result: any) => {
                this.users = result.data 
        });
    }

    deleteUser(id: string) {
        const user = this.users!.find((x: { id: string; }) => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users!.filter((x: { id: string; }) => x.id !== id));
    }
}