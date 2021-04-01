import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchBoxService {
  constructor() {}

  // Subject for Search Box
  public _listenClicksSubject$ = new Subject<string>();
  private _listenClicks$ = this._listenClicksSubject$.asObservable();

  get listenClicks$(): Observable<string> {
    console.log('Getting Clicked event');
    return this._listenClicks$;
  }
  set listenClicks(value: string) {
    console.log('Button clicked....In SearchService.ts');
    this._listenClicksSubject$.next(value);
  }

  // Subject for Search Box
  private _searchBoxQuerySubject$ = new Subject<string>();
  private _searchBoxQuery$ = this._searchBoxQuerySubject$.asObservable().pipe(
    share(),
    distinctUntilChanged(
      (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
    )
  );

  get searchBoxQuery$(): Observable<string> {
    return this._searchBoxQuery$;
  }
  set searchBoxQuery(value: string) {
    this._searchBoxQuerySubject$.next(value);
  }

  ProcessKeywords(keyword = null, data = null, processingMethod: any) {
    return processingMethod(keyword, data);
  }
}
