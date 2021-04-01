import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-navbar',
  templateUrl: './shopping-navbar.component.html',
  styleUrls: ['./shopping-navbar.component.scss'],
})
export class ShoppingNavbarComponent implements OnInit {
  @Input('titleColored') titleColored!: string;
  @Input('titleUnColored') titleUnColored!: string;

  constructor() {}

  ngOnInit(): void {}
}
