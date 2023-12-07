import { Component } from '@angular/core';

import { AccountService, RoleService, PolicyService, PermissionService } from './_services';
import { User, Role, Policy, Permission } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    user?: User | null;
    role?: Role | null;
    policy?: Policy | null;
    permission?: Permission | null;

    constructor(
        private accountService: AccountService,
        private roleService: RoleService,
        private policyService: PolicyService,
        private permissionService: PermissionService) {
        this.accountService.user.subscribe(x => this.user = x);
        this.roleService.role.subscribe(x => this.role = x);
        this.policyService.policy.subscribe(x => this.policy = x);
        this.permissionService.permission.subscribe(x => this.permission = x);
    }

    logout() {
        this.accountService.logout();
    }
}