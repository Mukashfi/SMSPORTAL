import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubUsers } from 'app/shared/model/sub-users.model';

@Component({
  selector: 'jhi-sub-users-detail',
  templateUrl: './sub-users-detail.component.html'
})
export class SubUsersDetailComponent implements OnInit {
  subUsers: ISubUsers;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subUsers }) => {
      this.subUsers = subUsers;
    });
  }

  previousState() {
    window.history.back();
  }
}
