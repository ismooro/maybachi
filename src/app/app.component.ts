import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'PROD';

  ngAfterViewInit() {
  const cursor = document.getElementById('custom-cursor')!;
  const aura = document.getElementById('cursor-aura')!;

  cursor.style.backgroundImage = `url('assets/logo.png')`;

  let timeoutId: any;

  window.addEventListener('mousemove', e => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    aura.style.left = `${x}px`;
    aura.style.top = `${y}px`;

    aura.style.background = 'rgb(0, 255, 255)'; // bleu ciel

    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      aura.style.background = 'rgb(255, 255, 255)'; // rouge
    }, 300);
  });
}

}

