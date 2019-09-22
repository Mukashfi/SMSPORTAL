import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPackages } from 'app/shared/model/packages.model';

@Component({
  selector: 'jhi-packages-detail',
  templateUrl: './packages-detail.component.html'
})
export class PackagesDetailComponent implements OnInit {
  packages: IPackages;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ packages }) => {
      this.packages = packages;
    });
  }

  previousState() {
    window.history.back();
  }
}
