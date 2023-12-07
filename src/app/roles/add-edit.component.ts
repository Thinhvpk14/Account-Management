import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, RoleService } from '@app/_services';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
  title!: string;
  id?: string;
  loading = false;
  form!: FormGroup;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.title = 'Add Role'
    if (this.id) {
      this.title = 'Edit Role';
      this.loading = true;
      this.roleService.getById(this.id)
        .pipe(first())
        .subscribe((result: any) => {
            this.form.patchValue(result);
            this.loading = false;
        })
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveRole()
      .pipe(first())
      .subscribe({
        next: () => {
            this.alertService.success('Role saved', { keepAfterRouteChange: true });
            this.router.navigateByUrl('/roles');
        },
        error: error => {
            this.alertService.error(error);
            this.submitting = false;
        }
    })
  }

  private saveRole() {
    return this.id
      ? this.roleService.update(this.id!, this.form.value)
      : this.roleService.insert(this.form.value)
}

}
