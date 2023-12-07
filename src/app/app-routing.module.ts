import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const rolesModule = () => import('./roles/roles.module').then(x => x.RolesModule);
const policesModule = () => import('./polices/polices.module').then(x => x.PolicesModule);
const permissionsModule = () => import('./permissions/permissions.module').then(x => x.PermissionsModule);
const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule },
    { path: 'roles', loadChildren: rolesModule },
    { path: 'polices', loadChildren: policesModule },
    { path: 'permissions', loadChildren: permissionsModule },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }