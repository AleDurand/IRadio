import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { MusicControls } from 'ionic-native';

import { RadioPlayerService } from '../../services/radio-player.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public playerCreated: boolean;
	public isPlaying: boolean;

  constructor(private loadingCtlr: LoadingController, public navCtrl: NavController, private radioPlayerService: RadioPlayerService) {
  	this.isPlaying = false;
  }

  togglePlay() {
  	let loader = this.loadingCtlr.create({ content: 'Por favor, espere...'})
  	loader.present();
  	if(this.isPlaying) {
  		this.radioPlayerService.pause();
  		this.isPlaying = false;
  		loader.dismissAll();
  	} else {
  		this.radioPlayerService.play().then((playing: boolean) => {
        if(!this.playerCreated) {
          this.initPlayer();
        }
				this.isPlaying = playing;	
				loader.dismissAll();
			});
  	}  	
  }

  initPlayer() {
    MusicControls.create({
      track: 'Radio 100', artist: '',
      cover: 'https://lh6.ggpht.com/gugqD8aJHuUpYV3fqeSkmR2VGGZmyPiL2CufWjiUUiFfk6ErrYZs99O4e5DPc1jsDjI=w300',   
      isPlaying: true, dismissable: true, hasPrev: false, hasNext: false, hasClose: false, ticker: ''
    });

    MusicControls.subscribe().subscribe((action) => {
      switch(action) {
        case 'music-controls-pause':
          this.radioPlayerService.play();
          this.isPlaying = true;
          MusicControls.updateIsPlaying(this.isPlaying);
          break;
        case 'music-controls-play':
          this.radioPlayerService.pause();
          this.isPlaying = false;
          MusicControls.updateIsPlaying(this.isPlaying);
          break;
        case 'music-controls-destroy':
          MusicControls.destroy().then(() => {
            this.radioPlayerService.pause();
            this.isPlaying = false;
            this.playerCreated = false;
          });
          break;
        default:
          break;
      }
    });
  }

}
