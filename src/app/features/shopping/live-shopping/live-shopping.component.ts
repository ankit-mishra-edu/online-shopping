import { Component, OnInit } from '@angular/core';
import Peer from 'peerjs';

@Component({
  selector: 'app-live-shopping',
  templateUrl: './live-shopping.component.html',
  styleUrls: ['./live-shopping.component.scss'],
})
export class LiveShoppingComponent implements OnInit {
  peerId!: string;
  peerIdShare!: string;
  private _peer!: Peer;
  lazyStream!: MediaStream;
  peerList: Array<any> = [];
  currentPeer!: RTCPeerConnection;
  screenIsShared: boolean = false;

  constructor() {
    this._peer = new Peer();
  }

  ngOnInit(): void {
    this.getPeerId();
  }

  private getPeerId = () => {
    //Generate unique Peer Id for establishing connection
    this._peer.on('open', (id: any) => {
      this.peerId = id;
    });

    // Peer event to accept incoming calls
    this._peer.on('call', (call: any) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          this.lazyStream = stream;

          call.answer(stream);
          call.on('stream', (remoteStream: any) => {
            if (!this.peerList.includes(call.peer)) {
              this.streamRemoteVideo(remoteStream);
              this.currentPeer = call.peerConnection;
              this.peerList.push(call.peer);
            }
          });
        })
        .catch((err) => {
          console.log(err + 'Unable to get media');
        });
    });
  };

  streamRemoteVideo(stream: any) {
    const video = <HTMLVideoElement>document.getElementById('remote-video');
    video.srcObject = stream;
    video.play();
  }

  callPeer(id: string): void {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.lazyStream = stream;

        const call = this._peer.call(id, stream);
        call.on('stream', (remoteStream: any) => {
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
          }
        });
      })
      .catch((err) => {
        console.log(err + 'Unable to connect');
      });
  }

  shareScreen() {
    this.screenIsShared = true;
    // @ts-ignore
    (navigator.mediaDevices as any)
      .getDisplayMedia({
        video: {
          cursor: 'always',
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      })
      .then((stream: any) => {
        // this.streamRemoteVideo(stream);
        const videoTrack = stream.getVideoTracks()[0];
        videoTrack.onended = () => {
          this.stopScreenShare();
        };

        const sender = this.currentPeer
          ?.getSenders()
          .find((s: any) => (s as any).track.kind === videoTrack.kind);
        sender?.replaceTrack(videoTrack);
      })
      .catch((err: any) => {
        console.log('Unable to get display media ' + err);
      });
  }

  stopScreenShare() {
    const videoTrack = this.lazyStream.getVideoTracks()[0];
    const sender = this.currentPeer
      .getSenders()
      .find((s) => (s as any).track.kind === videoTrack.kind);
    sender?.replaceTrack(videoTrack);
  }
}
