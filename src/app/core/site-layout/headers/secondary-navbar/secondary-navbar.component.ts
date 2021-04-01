import { Component, OnInit } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss'],
})
export class SecondaryNavbarComponent implements OnInit {
  currentRouteURL$!: Observable<NavigationStart>;

  constructor(private _commonService: CommonService) {}

  ngOnInit(): void {
    this.currentRouteURL$ = this._commonService.currentRouteURL$();
  }

  routeIsHomeURL(currentRouteURL: string): boolean {
    if (currentRouteURL.startsWith('/') && currentRouteURL.endsWith('/')) {
      return true;
    }
    return false;
  }

  routeIsLiveShoppingURL(currentRouteURL: string): boolean {
    if (currentRouteURL.startsWith('/shopping')) {
      return true;
    }
    return false;
  }
}
