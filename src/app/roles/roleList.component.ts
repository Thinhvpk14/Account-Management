import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { RoleService } from '@app/_services';
import { Role } from '@app/_models/role';
import { map } from 'rxjs/operators';

@Component({ templateUrl: 'roleList.component.html' })
export class RoleListComponent implements OnInit {
    roles: any[] = [];
    totalRecords?: number;
    constructor(private roleService: RoleService) {}

    ngOnInit() {
        this.roleService.getAll()
            .pipe(first())
            .subscribe((result: any) => {
                console.log(result)
                this.roles = result.data
                this.totalRecords = result.totalRecords               
            });
    }
    deleteRole(id: string) {
        const user = this.roles!.find(x => x.id === id);
        user.isDeleting = true;
        this.roleService.delete(id)
            .pipe(first())
            .subscribe(() => this.roles = this.roles!.filter(x => x.id !== id));
    }
}