import { Component, Input } from '@angular/core';
import { UserService } from '../../providers/index';

@Component({
  selector: 'header-content',
  templateUrl: 'header-content.html'
})

/**
 * Composant permettant d'afficher le même header sur toutes les pages qui en ont un.
 * Permet de factoriser le style et l'apparence de celui-ci, et d'ajouter le nombre de crédits disponibles.
 */

export class HeaderContentComponent {

  /**
   * Titre de la page à afficher dans le header et dans l'onglet de navigation
   */
  @Input() title: string;

  constructor(private userService: UserService) {
    document.title = 'Ionic App';
  }

}
