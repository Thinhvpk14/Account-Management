import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '@app/layout.component';
import { RoleListComponent } from './roleList.component';
import { AddEditComponent } from './add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: RoleListComponent },
            { path: 'add', component: AddEditComponent},
            { path: 'edit/:id', component: AddEditComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolesRoutingModule { }