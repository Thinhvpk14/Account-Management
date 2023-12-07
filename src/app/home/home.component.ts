import { Component } from '@angular/core';

import { User, Role, Policy } from '@app/_models';
import { AccountService, PolicyService, RoleService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User | null;
    role: Role | null;
    policy: Policy | null;
    constructor(
        private accountService: AccountService,
        private roleService: RoleService,
        private policyService: PolicyService) {
        this.user = this.accountService.userValue;
        this.role = this.roleService.roleValue;
        this.policy = this.policyService.policyValue;
    }
}