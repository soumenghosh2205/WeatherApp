import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs'
import { HistoryComponent } from './history.component'
import { City } from '../../models/city.model'
import { getSearchedCities, setSelectedCity } from '../../store/app.actions'
import { selectSearchedCities } from 'src/app/store/app.selectors'
import { StoreModule } from '@ngrx/store'

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore()]
    })

    fixture = TestBed.createComponent(HistoryComponent)
    component = fixture.componentInstance
    mockStore = TestBed.inject(MockStore)

    spyOn(mockStore, 'dispatch')

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should dispatch getSearchedCities action on ngOnInit', () => {
    component.ngOnInit()
    expect(mockStore.dispatch).toHaveBeenCalledWith(getSearchedCities())
  })

  it('should set selected city on setSelectedCity', () => {
    const selectedCity: City = { abbr: 'b', name: 'b', capital: 'b1', lat: '10', long: '20' }
    const event = new Event('click')
    component.setSelectedCity(selectedCity, event)
    expect(mockStore.dispatch).toHaveBeenCalledWith(setSelectedCity({ selectedCity }))
  })

  it('should initialize searchedCities$ with the correct selector', () => {
    const mockCities: City[] = [
      { abbr: 'a', name: 'a', capital: 'a1', lat: '20', long: '30' },
      { abbr: 'b', name: 'b', capital: 'b1', lat: '10', long: '20' }
    ]

    mockStore.overrideSelector(selectSearchedCities, mockCities)

    component.searchedCities$.subscribe((data) => {
      expect(data).toEqual(mockCities)
    })
  })
})
