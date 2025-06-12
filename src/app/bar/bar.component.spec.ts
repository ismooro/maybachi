import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  isPlaying = false;
  showBlankScreen = false;
  showOverlay = true;

  readonly START_TIME = 27;
  readonly END_TIME = 37.5;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    window.addEventListener('wheel', (event) => {
      if (!this.isPlaying && !this.showBlankScreen && event.deltaY > 0) {
        this.playVideoSegment();
      }
    });

    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= this.END_TIME && !this.showBlankScreen) {
        video.pause();
        this.isPlaying = false;
        this.showBlankScreen = true;

        // Rediriger ou autre logique ici si besoin
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showOverlay = false;
    }, 600);
  }

  playVideoSegment() {
    const video = this.videoRef.nativeElement;

    this.isPlaying = true;
    video.currentTime = this.START_TIME;
    video.muted = true;

    video.play().catch(err => {
      console.error('Erreur de lecture vidéo :', err);
      this.isPlaying = false;
    });
  }
}
