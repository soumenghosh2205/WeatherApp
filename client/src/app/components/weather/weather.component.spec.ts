import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { WeatherComponent } from './weather.component'
import { StoreModule } from '@ngrx/store'

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore()]
    })

    fixture = TestBed.createComponent(WeatherComponent)
    component = fixture.componentInstance
    mockStore = TestBed.inject(MockStore)

    spyOn(mockStore, 'dispatch')

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })
})
