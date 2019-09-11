import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISMSusers } from 'app/shared/model/sm-susers.model';

@Component({
  selector: 'jhi-sm-susers-detail',
  templateUrl: './sm-susers-detail.component.html'
})
export class SMSusersDetailComponent implements OnInit {
  sMSusers: ISMSusers;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sMSusers }) => {
      this.sMSusers = sMSusers;
    });
  }

  previousState() {
    window.history.back();
  }
}
