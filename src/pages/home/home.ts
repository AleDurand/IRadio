import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { RadioPlayerService } from '../../services/radio-player.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

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
				this.isPlaying = playing;	
				loader.dismissAll();
			});
  	}  	
  }

}
