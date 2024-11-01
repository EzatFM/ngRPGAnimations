import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { shakeX, pulse, bounce, flip } from 'ng-animate';
import { lastValueFrom, timer } from 'rxjs';


const DEATH_DURATION_SECONDS = 0.5;
const ATTACK_PULSE_DURATION_SECONDS = 0.3;
const HIT_WOBBLE_DURATION_SECONDS = 0.3;


//Parti 2 
const Bounce_Animation_Duree = 1;
const Shake_Animation_Duree = 0.75;
const Flip_Animation_Duree = 0.75;

const Rotate_center_Animation = 0.8;
const Rotate_horTop_Animation = 0.7;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: DEATH_DURATION_SECONDS}}))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {params: {timing: ATTACK_PULSE_DURATION_SECONDS, scale: 4.5}}))]),

    //Parti 2
    trigger('bounce', [transition(':increment', useAnimation(bounce, {params: {timing: Bounce_Animation_Duree}}))]),
    trigger('shake', [transition(':increment', useAnimation(shakeX, {params: {timing: Shake_Animation_Duree}}))]),
    trigger('flip', [transition(':increment', useAnimation(flip, {params: {timing: Flip_Animation_Duree}}))]),

  ]
})

export class AppComponent {
  slimeIsPresent = false;

  ng_death = 0;
  ng_attack = 0;
  css_hit = false;

  //Parti 2
  ng_shake = 0;
  ng_bounce = 0;
  ng_flip = 0;

  css_rotateCenter = false;
  css_rotateHorTop = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    this.showSlime();
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    this.hideSlime();
    this.ng_death++;
    // TODO 2e animation angular en même temps
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    setTimeout(() => this.ng_attack++, 200)
    // TODO Jouer une autre animation avant
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => this.css_hit = false, HIT_WOBBLE_DURATION_SECONDS * 1000);
  }

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }


  //Parti 2
  async bounceShakeFlip() {
    this.ng_bounce++;
    await lastValueFrom(timer(Bounce_Animation_Duree * 1000));
    this.ng_shake++;
    await lastValueFrom(timer(Shake_Animation_Duree * 1000));
    this.ng_flip++;
  }

  infiniteTripleSpin() {
    this.rotateCenter();
  }

  rotateCenter() {
    this.css_rotateCenter = true;
    setTimeout(() => {
      this.css_rotateCenter = false; 
      this.rotateHorTop();
    }, Rotate_center_Animation * 2 * 1000);
  }

  rotateHorTop() {
    this.css_rotateHorTop = true;
    setTimeout(() => {
      this.css_rotateHorTop = false;
      this.rotateCenter();
    }, Rotate_horTop_Animation * 1000);
  }

}
