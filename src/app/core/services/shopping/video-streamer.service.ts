import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VideoStreamerService {
  vendorUrl!: any;
  video!: HTMLElement | null;

  peerId!: string;
  private _peer!: Peer;
  peerIdShare!: string;
  private _videoStream$!: Observable<MediaStream>;
  lazyStream!: MediaStream;
  peerList: any;
  currentPeer!: RTCPeerConnection;
  peer: any;

  constructor() {}
}
