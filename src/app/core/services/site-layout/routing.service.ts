import { Injectable } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private _router: Router) {}

  // Data storage for which navigation bar to show
  private _currentRouteURL$: Observable<NavigationStart> = this._router.events.pipe(
    filter((event: Event) => event instanceof NavigationStart),
    map((event: Event) => <NavigationStart>event)
  );

  get currentRouteURL$(): Observable<NavigationStart> {
    return this._currentRouteURL$;
  }
}
