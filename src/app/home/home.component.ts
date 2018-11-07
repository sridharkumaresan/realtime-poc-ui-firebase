import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cards: Array<any> = [
    {name: 'app1', link: '/list', image: 'cv1', title: 'Demo With Firebase', description: ''},
    {name: 'app2', link: '', image: 'cv2', title: 'Demo with Socket', description: ''},
    {name: 'app3', link: '', image: 'cv3', title: 'Another App', description: ''}

  ]
  constructor(private route: Router) { }

  ngOnInit() {
  }

  openApp(link) {
    this.route.navigate([link]);
  }
}
