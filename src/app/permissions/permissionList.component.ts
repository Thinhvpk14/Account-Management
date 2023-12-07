import { Component, OnInit } from '@angular/core';
import { PermissionService } from '@app/_services';
import { first } from 'rxjs';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permissionList.component.html',
  
})
export class PermissionListComponent implements OnInit {
  permissions: any[] = []
  constructor(private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.permissionService.getAll()
      .pipe(first())
      .subscribe((result: any) => 
      {
        this.permissions = result.data
      });
  }

}
