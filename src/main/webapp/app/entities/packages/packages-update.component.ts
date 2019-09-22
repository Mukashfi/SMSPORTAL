import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPackages, Packages } from 'app/shared/model/packages.model';
import { PackagesService } from './packages.service';

@Component({
  selector: 'jhi-packages-update',
  templateUrl: './packages-update.component.html'
})
export class PackagesUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    points: [],
    price: []
  });

  constructor(protected packagesService: PackagesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ packages }) => {
      this.updateForm(packages);
    });
  }

  updateForm(packages: IPackages) {
    this.editForm.patchValue({
      id: packages.id,
      points: packages.points,
      price: packages.price
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const packages = this.createFromForm();
    if (packages.id !== undefined) {
      this.subscribeToSaveResponse(this.packagesService.update(packages));
    } else {
      this.subscribeToSaveResponse(this.packagesService.create(packages));
    }
  }

  private createFromForm(): IPackages {
    return {
      ...new Packages(),
      id: this.editForm.get(['id']).value,
      points: this.editForm.get(['points']).value,
      price: this.editForm.get(['price']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPackages>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
