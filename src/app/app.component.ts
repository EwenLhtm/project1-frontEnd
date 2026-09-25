import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Composant racine qui accueille le contenu affiche par le routeur.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'etudiant-frontend';
}
