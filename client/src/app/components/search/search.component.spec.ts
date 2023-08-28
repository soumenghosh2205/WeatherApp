import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchComponent } from './search.component'
import { StoreModule } from '@ngrx/store'

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore()]
    })

    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
    mockStore = TestBed.inject(MockStore)

    spyOn(mockStore, 'dispatch')

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })
})
