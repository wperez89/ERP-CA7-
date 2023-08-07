import { Component, OnInit } from '@angular/core';
import { VerticalSidebarService } from 'src/app/shared/vertical-sidebar/vertical-sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sidebarData: any;

  constructor(private sidebarService: VerticalSidebarService) { }

  ngOnInit()
  {
    this.sidebarService.items.subscribe((data) => {
      this.sidebarData = data;
    });
  }

}
