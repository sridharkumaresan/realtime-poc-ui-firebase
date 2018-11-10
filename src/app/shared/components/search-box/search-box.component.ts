import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  searchControl: FormControl = new FormControl('');

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
    
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(
      (term: string) => {
        this.interactionService.searchTermSubject.next(term);
      }
    )
  }

}
