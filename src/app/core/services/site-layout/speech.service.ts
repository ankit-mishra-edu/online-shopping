import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { SearchBoxService } from './search-box.service';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  speechRecognition: any;
  private _spokenKeywords$!: Observable<string>;

  constructor(private _searchBoxService: SearchBoxService) {
    this.createSpeechRegognitionObject();

    // countinously check if mic is pressed if yes, start listening
    this._spokenKeywords$ = this._searchBoxService.listenClicks$.pipe(
      switchMap(() => this.listen()),
      share()
    );
  }

  get spokenKeywords$(): Observable<string> {
    return this._spokenKeywords$;
  }

  createSpeechRegognitionObject() {
    const { webkitSpeechRecognition } = window as any;
    this.speechRecognition = new webkitSpeechRecognition();
    console.log('Object Created');
    console.log(this.speechRecognition);
  }

  listen(): Observable<string> {
    return new Observable<string>((observer) => {
      console.log('Started Listening....');

      const resultHandler = (speechRecognitionObj: any) => {
        console.log(speechRecognitionObj);
        const speech: string = this.getTranscript(speechRecognitionObj.results);
        console.log(speech);
        observer.next(speech);
        observer.complete();
      };

      const errorHandler = (err: any) => {
        observer.error(err);
      };

      this.speechRecognition.addEventListener('result', resultHandler);
      this.speechRecognition.addEventListener('error', errorHandler);
      this.speechRecognition.start();

      return () => {
        this.speechRecognition.removeEventListener('result', resultHandler);
        this.speechRecognition.removeEventListener('error', errorHandler);
        this.speechRecognition.abort();
      };
    });
  }

  getTranscript(results: { transcript: string }[][]): string {
    return results[0][0].transcript;
  }
}
