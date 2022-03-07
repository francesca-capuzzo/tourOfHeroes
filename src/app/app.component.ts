import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour Of Heroes'; //si può aggiungere public o private davanti a 'title' --> default è public e può essere visto dagli altri componenti ed utilizzato
}
