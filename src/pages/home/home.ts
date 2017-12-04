import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AudioProvider } from 'ionic-audio';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SocialSharing} from '@ionic-native/social-sharing';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any;
  myTracks: any[] = [];
  allTracks: any[];
  selectedTrack;
  static fileName: string;
  static localName: string;



  constructor(public navCtrl: NavController, public http: Http, private _audioProvider: AudioProvider, private transfer: FileTransfer, private file: File, public socialSharing: SocialSharing) {
    //this.http.get('http://kmclearvoice.com/rss2json/feed2.json').map(res => res.json()).subscribe(data => {
    // this.http.get('http://www.kmclearvoice.com/lifepod/json/lifepod1.json').map(res => res.json()).subscribe(data => {
    this.http.get('https://www.surehope.net/lifepod/json/hmongradio.json').map(res => res.json()).subscribe(data => {

      for (let ind_item of data.item) { //loop through feed items, push to the new array
        console.log("first..." + ind_item.link)

        //HomePage.fileName = ind_item.link; //default to remote
        //HomePage.localName = ind_item.link.replace(/^http:\/\/(.*).mp3/g,"$1").replace(/[\.\/]/g, "_") + ".mp3";

        //console.log(this.file.dataDirectory+ HomePage.localName)
        //this.file.checkFile(this.file.dataDirectory, HomePage.localName).then(_ => console.log('File exists')).catch(err => console.log('Directory doesnt exist'));

        var url = this.getSourceName(ind_item.link, ind_item.description, ind_item.title, ind_item.date);
        //console.log(url);

        /*      this.file.checkFile(this.file.externalDataDirectory, HomePage.localName).then(_ => { //if file exists locally, used the downloaded copy
                //HomePage.fileName = (this.file.dataDirectory + this.convertURLtoFileName(ind_item.link)),
            
                //  HomePage.fileName = (this.file.dataDirectory + this.convertURLtoFileName(ind_item.link))
                console.log("found local file..." +  this.file.externalDataDirectory+HomePage.localName)  
                //HomePage.fileName = this.file.externalDataDirectory + HomePage.localName;
                      console.log("final path..." + HomePage.fileName);
               }).catch(_ => {
                 console.log("notfound");
                       console.log("final path..." + HomePage.fileName);
                 })*/



        //if file exists, src is local file, otherwise leave URL for streaming
        /*    this.myTracks.push({
               src: HomePage.fileName,
               artist: ind_item.description,
               title: ind_item.title,
               art: ind_item.description,
               airDate: ind_item.date,
               preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
             })*/

        /*       });*/
        //  });
      }
    });
  }

  getSourceName(url, desc, title, date) {
    //comment
    console.log("arrived")
    this.file.resolveLocalFilesystemUrl(this.file.dataDirectory + url.replace(/^http:\/\/(.*).mp3/g, "$1").replace(/[\.\/]/g, "_") + ".mp3").then(res => { //if file exists locally, used the downloaded copy
      //HomePage.fileName = (this.file.dataDirectory + this.convertURLtoFileName(ind_item.link)),

      //  HomePage.fileName = (this.file.dataDirectory + this.convertURLtoFileName(ind_item.link))
      console.log("found local file..." + res.toURL())
      //HomePage.fileName = this.file.externalDataDirectory + HomePage.localName;
      //     console.log("final path..." + HomePage.fileName);
      console.log(res.toURL())
      // return res.toURL()
      this.myTracks.push({
        src: res.toURL(),
        artist: desc,
        title: title,
        art: desc,
        airDate: date,
        preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
      })
    }, err => {
      console.log("remote..." + url)
      //return url.toURL();
      this.myTracks.push({
        src: url,
        artist: desc,
        title: title,
        art: desc,
        airDate: date,
        preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
      })
    })
  }

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

  convertURLtoFileName(url) {
    return url.replace(/^http:\/\/(.*).mp3/g, "$1").replace(/[\.\/]/g, "_") + ".mp3"; //converting the URL to a filename
  }
  private fileTransfer: FileTransferObject = this.transfer.create();

  public async start_download(url): Promise < void > {
    //const url = 'http://jbharrison62966.podbean.com/mf/feed/quh5k7/The_Harvest.mp3';
    //const url = 'https://www.kmclearvoice.com/joy.mp3';          
    console.log('download starting... ' + url);
    console.log(this.file.dataDirectory + this.convertURLtoFileName(url));
    this.fileTransfer.download(url, this.file.dataDirectory + this.convertURLtoFileName(url)).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
      console.log('error ');
    });

  }

  shareApp(): void {

    this.socialSharing.share('Download Here', 'App', null, 'http://www.kmclearvoice.com/lifepod/apk/lifepod.apk').then(() => {
      // Successfile:///data/app/com.yourapppackagename/base.apk
      console.log('success!');
    }).catch(() => {
      // Error!
    });
  }
}

