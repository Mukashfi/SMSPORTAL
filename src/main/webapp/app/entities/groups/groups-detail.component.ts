import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroups } from 'app/shared/model/groups.model';

@Component({
  selector: 'jhi-groups-detail',
  templateUrl: './groups-detail.component.html'
})
export class GroupsDetailComponent implements OnInit {
  groups: IGroups;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ groups }) => {
      this.groups = groups;
    });
  }

  previousState() {
    window.history.back();
  }
}
