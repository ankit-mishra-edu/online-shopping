import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutingService } from './site-layout/routing.service';
import { Event, NavigationStart } from '@angular/router';
import { SearchBoxService } from './site-layout/search-box.service';
import { SpeechService } from './site-layout/speech.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private _speechService: SpeechService,
    private _routingService: RoutingService,
    private _searchBoxService: SearchBoxService
  ) {}

  // For RoutingService
  currentRouteURL$(): Observable<NavigationStart> {
    return this._routingService.currentRouteURL$;
  }

  // For SearchBoxService
  get searchBoxQuery$(): Observable<string> {
    return this._searchBoxService.searchBoxQuery$;
  }
  set searchBoxQuery(value: string) {
    this._searchBoxService.searchBoxQuery = value;
  }
  ProcessKeywords(keyword = null, data = null, processingMethod: any) {
    this._searchBoxService.ProcessKeywords(keyword, data, processingMethod);
  }

  get listenClicks$() {
    return this._searchBoxService.listenClicks$;
  }
  set listenClicks(value: string) {
    console.log('Button clicked....In CommonService.ts');
    this._searchBoxService.listenClicks = value;
  }

  //  For SpeechService
  get spokenKeywords$(): Observable<string> {
    return this._speechService.spokenKeywords$;
  }

  listen(): Observable<string> {
    return this._speechService.listen();
  }
}
