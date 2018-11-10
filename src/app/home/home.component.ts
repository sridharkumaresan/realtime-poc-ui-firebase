import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from '../shared/services/interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cards: Array<any> = [
    {name: 'app1', link: '/list-fb', image: 'cv1', title: 'Firebase Material', description: 'This is a Demo to Show the implementation of Angular Material design with Firebase'},
    {name: 'app2', link: '/list-wj', image: 'cv2', title: 'Wijmo Socket', description: 'This is a Demo to Show the implementation of Wijmo, Angular Material design with Socket IO'},
    {name: 'app3', link: '', image: 'cv3', title: 'Another App', description: 'This is some other app used for some other reason...'}
  ];
  _cards;
  
  constructor(private route: Router, private interactionService: InteractionService) { 
    this._cards = [...this.cards];
  }

  ngOnInit() {
    this.interactionService.searchNotifier$.subscribe(
      term => {
        let _cards = this.cards.filter(
          (str: any) => str.title.toLowerCase().includes(term.toLowerCase()));
        this._cards = [..._cards];
      }
    )
  }

  openApp(link) {
    this.route.navigate([link]);
  }

}
