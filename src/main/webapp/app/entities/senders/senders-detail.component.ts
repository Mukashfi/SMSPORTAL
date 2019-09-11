import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISenders } from 'app/shared/model/senders.model';

@Component({
  selector: 'jhi-senders-detail',
  templateUrl: './senders-detail.component.html'
})
export class SendersDetailComponent implements OnInit {
  senders: ISenders;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ senders }) => {
      this.senders = senders;
    });
  }

  previousState() {
    window.history.back();
  }
}
