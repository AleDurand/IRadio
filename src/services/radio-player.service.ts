import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class RadioPlayerService {
	private stream: any;
	
  constructor(public af: AngularFire) {
  	af.database.object('radio-url').subscribe((url) => {
			this.stream = new Audio(url.$value);
  	});
  }

	play() {
		return new Promise((resolve, reject) => {
			if(this.stream !== null) {
				this.stream.play();
				this.stream.addEventListener('playing', () => resolve(true));
				this.stream.addEventListener('error', () => reject(false));
			} else {
				reject(false);
			}
		});
	};

	pause() {
		this.stream.pause();
	};

}
