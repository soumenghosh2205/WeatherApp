import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSearchedCities } from 'src/app/store/app.selectors';
import { getSearchedCities, setSelectedCity } from 'src/app/store/app.actions';
import { City } from 'src/app/models/city.model';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  searchedCities$: Observable<City[]> = this.store.select(selectSearchedCities)

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getSearchedCities())
  }

  setSelectedCity(selectedCity: City, event: Event): void {
    event.preventDefault();
    this.store.dispatch(setSelectedCity({ selectedCity }))
  }
}
