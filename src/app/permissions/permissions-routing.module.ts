import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@app/layout.component';
import { PermissionListComponent } from './permissionList.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
        children: [
            { path: '', component: PermissionListComponent},

        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
