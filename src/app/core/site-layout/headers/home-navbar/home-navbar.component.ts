import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit {
  @Input('titleColored') titleColored!: string;
  @Input('titleUnColored') titleUnColored!: string;

  constructor() {}

  ngOnInit(): void {}
}
