import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout.component';
import { RolesRoutingModule } from './roles-routing.module';
import { RoleListComponent } from './roleList.component';
import { AddEditComponent } from './add-edit.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RolesRoutingModule
    ],
    declarations: [
        RoleListComponent,
        AddEditComponent
    ]
})
export class RolesModule { }