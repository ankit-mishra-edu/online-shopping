import { Component, OnInit } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  constructor(private _commonService: CommonService) {}

  ngOnInit(): void {}

  get spokenKeywords$(): Observable<string> {
    return this._commonService.spokenKeywords$;
  }

  get searchBoxTypedKeywords$(): Observable<string> {
    return this._commonService.searchBoxQuery$;
  }

  set searchBoxTypedKeywords(value: string) {
    console.log(value);
    this._commonService.searchBoxQuery = value;
  }

  searchBoxKeywords$ = merge(
    this.spokenKeywords$,
    this.searchBoxTypedKeywords$
  );

  get listenClicks$(): Observable<string> {
    console.log(this._commonService.listenClicks$);
    return this._commonService.listenClicks$;
  }

  set listenClicks(value: string) {
    console.log('Button clicked....In SearchBox.ts');
    this._commonService.listenClicks = value;
  }
}
