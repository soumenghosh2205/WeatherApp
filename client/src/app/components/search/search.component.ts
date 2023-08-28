import { Component, OnInit } from '@angular/core'
import { City } from '../../models/city.model'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { getAllCities, getSearchedCities, setSelectedCity } from 'src/app/store/app.actions'
import { selectAllCities } from 'src/app/store/app.selectors'

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  allCities$: Observable<City[]> = this.store.select(selectAllCities)
  allCities: City[] = []
  filteredCities: City[] = []
  searchText: string = ''

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllCities())
    this.store.dispatch(getSearchedCities())

    this.allCities$.subscribe((cities) =>
      this.allCities = cities
    )
  }

  filterResults(): void {
    if (!this.searchText) {
      this.filteredCities = []
      return
    }

    this.filteredCities = this.allCities.filter(c => c.capital.toLowerCase().includes(this.searchText) || c.name.toLowerCase().includes(this.searchText))

  }

  resetSearch(): void {
    this.searchText = ''
    this.filteredCities = []
  }

  setSelectedCity(selectedCity: City, event: Event): void {
    event.preventDefault()
    this.store.dispatch(setSelectedCity({ selectedCity }))
    this.resetSearch()
  }
}
