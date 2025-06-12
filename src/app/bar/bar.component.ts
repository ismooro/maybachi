import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements AfterViewInit, OnInit {
  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;

  showOverlay = true;          // overlay noir de début
  showBlankScreen = false;     // cache ou montre la vidéo
  showNavbar = false;


  readonly START_TIME = 35;    // début de la séquence à jouer
  readonly END_TIME = 37.5;    // fin de la séquence

  ngOnInit(): void {
    setTimeout(() => {
      this.showNavbar = true;
    }, 2000);

    // Faire disparaître le fondu noir initial après 600ms
    setTimeout(() => {
      this.showOverlay = false;
    }, 600);
  }

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    // Positionner au début de la séquence
    video.currentTime = this.START_TIME;
    video.muted = true;

    // Lecture automatique
    video.play().catch(err => {
      console.error('Erreur de lecture vidéo :', err);
    });

    // Lorsqu'on atteint la fin de la séquence
    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= this.END_TIME && !this.showBlankScreen) {
        video.pause();
        this.showBlankScreen = true; // cache la vidéo, montre le reste du site
      }
    });
  }
  
}
