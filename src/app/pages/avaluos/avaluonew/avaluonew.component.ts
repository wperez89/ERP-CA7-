import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaluonew',
  templateUrl: './avaluonew.component.html',
  styleUrls: ['./avaluonew.component.scss']
})
export class AvaluonewComponent implements OnInit {
  activeTab: string = 'home';
  constructor() { }

  ngOnInit(): void {
  }

  cambiarTab(tab: string): void {
    this.activeTab = tab;
  }
}
