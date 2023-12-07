import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout.component';
import { PolicesRoutingModule } from './polices-routing.module';
import { PolicyListComponent } from './policyList.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PolicesRoutingModule
    ],
    declarations: [
        PolicyListComponent
    ]
})
export class PolicesModule { }