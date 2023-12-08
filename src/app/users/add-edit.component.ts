import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, RoleService } from '@app/_services';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    status = false;
    currentUser: any
    roles: any
    selectedRoles: any[] = []
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private roleService: RoleService,
        private alertService: AlertService
    ) { }
     
    
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.getAllRole()
        // form with validation rules
        this.form = this.formBuilder.group({

            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {Validators: this.checkPasswords});

        this.title = 'Add User';
        if (this.id) {
            // edit mode
            this.title = 'Edit User';
            this.status = true;
            this.loading = true;
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe((result: any) => {
                    this.form.patchValue(result);
                    this.loading = false;
                });
        }
    }

    checkPasswords(group: FormGroup) {
        const password = ''
        const confirmPassword = ''

        return password === confirmPassword ? null : { notMatch: true };
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    
    getAllRole(){
        this.roleService.getAll()
            .pipe(first())
            .subscribe((result: any) => {
                this.roles = result.data
            })
    }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        this.saveUser()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/users');
                },
                error: error => {
                    this.alertService.error(error);
                    this.submitting = false;
                }
            })
    }

    private saveUser() {
        // create or update user based on id param
        return this.id
            ? this.accountService.update(this.id!, this.form.value)
            : this.accountService.insertUser(this.form.value)
    }
}