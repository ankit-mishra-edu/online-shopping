import { Component, OnDestroy, OnInit } from '@angular/core';
import Peer from 'peerjs';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-live-shopping',
  templateUrl: './live-shopping.component.html',
  styleUrls: ['./live-shopping.component.scss'],
})
export class LiveShoppingComponent implements OnInit, OnDestroy {
  peerId!: string;
  peerIdShare!: string;
  private _peer!: Peer;
  lazyStream!: MediaStream;
  peerList: Array<any> = [];
  currentPeer!: RTCPeerConnection;
  screenIsShared: boolean = false;

  outgoingMediaStream$!: Observable<MediaStream>;
  incomingJoinMediaStream$!: Observable<MediaStream>;
  incomingHostMediaStream$!: Observable<MediaStream>;

  audioConstraint = {
    audio: true,
    video: false,
  };

  videoConstraint = {
    audio: false,
    video: true,
  };

  audioVideoConstraint = {
    audio: true,
    video: true,
  };

  constructor() {
    this._peer = new Peer();
  }

  ngOnInit(): void {
    this.getPeerId();
  }

  joinSession(id: string) {
    this.callPeer(id, this.audioVideoConstraint, 'Join');
  }

  hostSession(id: string) {
    this.shareScreen(id, 'Host');
  }

  private getUserMedia$(constraint: {}): Observable<MediaStream> {
    return from(navigator.mediaDevices.getUserMedia(constraint));
  }

  private getPeerId = () => {
    //Generate unique Peer Id for establishing connection
    this._peer.on('open', (id: any) => {
      this.peerId = id;
    });

    // Peer event to accept incoming calls
    this._peer.on('call', (call: any) => {
      console.log('Incomming Call.....');

      if (call.metadata.type == 'Host') {
        this.AnswerIncomingHostCall(call);
      } else {
        this.AnswerIncomingJoinCall(call);
      }
    });

    // this._peer.off('call', (call: any) => this.stopScreenShare());
  };

  AnswerIncomingHostCall(call: any) {
    let acceptHostCallJoinSession = false;

    acceptHostCallJoinSession = confirm('Do you want to join Session?');

    if (acceptHostCallJoinSession) {
      let constraint = this.audioVideoConstraint;
      console.log(constraint);
      this.incomingHostMediaStream$ = this.getUserMedia$(constraint).pipe(
        map(
          (stream: MediaStream) => {
            call.answer(stream);
            this.streamVideo(call);
            this.lazyStream = stream;
            console.log('Call Answered to Join Host session', this.lazyStream);

            return this.lazyStream;
          },
          (err: any) => {
            console.log(err + 'Unable to connect');
          }
        )
      );
      this.incomingHostMediaStream$.subscribe();
    } else {
      call.close();
    }
  }

  AnswerIncomingJoinCall(call: any) {
    let acceptJoinCallToAddUser = false;

    acceptJoinCallToAddUser = confirm('Do you want to let user join?');

    if (acceptJoinCallToAddUser) {
      let constraint = this.audioConstraint;
      console.log(constraint);
      this.incomingJoinMediaStream$ = this.getUserMedia$(constraint).pipe(
        map(
          (stream: MediaStream) => {
            console.log('Checking Mode');
            call.answer(this.lazyStream);
            console.log('Call Answered from Join', this.lazyStream);

            return this.lazyStream;
          },
          (err: any) => {
            console.log(err + 'Unable to connect');
          }
        )
      );
      this.incomingJoinMediaStream$.subscribe();
    } else {
      call.close();
    }
  }

  callPeer(id: string, constraint: any, mode: string): void {
    this.outgoingMediaStream$ = this.getUserMedia$(constraint).pipe(
      tap(
        (stream: MediaStream) => {
          this.lazyStream = stream;

          let options = { metadata: { type: mode } };
          const call = this._peer.call(id, stream, options);
          console.log('Calling to ' + id);
          this.streamVideo(call);
        },
        (err) => {
          console.log(err + 'Unable to connect');
        }
      )
    );
  }

  shareScreen(id: string, mode: string) {
    this.screenIsShared = true;

    // @ts-ignore
    this.outgoingMediaStream$ = from(
      (navigator.mediaDevices as any).getDisplayMedia({
        video: {
          cursor: 'always',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      })
    ).pipe(
      tap(
        (stream: any) => {
          this.lazyStream = stream;
          let options = { metadata: { type: mode } };
          const call = this._peer.call(id, stream, options);
          this.currentPeer = call.peerConnection;

          const videoTrack = stream.getVideoTracks()[0];
          videoTrack.onended = () => {
            this.stopScreenShare();
          };
        },

        (err: any) => {
          console.log('Unable to get display media ' + err);
        }
      )
    );
  }

  streamVideo(call: any) {
    call.on('stream', (remoteStream: any) => {
      if (!this.peerList.includes(call.peer)) {
        this.showRemoteVideo(remoteStream);
        this.currentPeer = call.peerConnection;
        this.peerList.push(call.peer);
      }
    });
  }

  showRemoteVideo(stream: any) {
    const video = <HTMLVideoElement>document.getElementById('remote-video');
    video.srcObject = stream;
    video.play();
  }

  stopScreenShare() {
    const videoTrack = this.lazyStream.getVideoTracks()[0];
    const sender = this.currentPeer
      .getSenders()
      .find((s) => (s as any).track.kind === videoTrack.kind);
    sender?.replaceTrack(null);
    this.screenIsShared = false;
  }

  ngOnDestroy(): void {
    this.lazyStream.getTracks().forEach(function (track) {
      track.stop();
    });
    this.stopScreenShare();
  }
}
