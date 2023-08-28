import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DashboardComponent } from './dashboard.component'
import { StoreModule } from '@ngrx/store'

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore()]
    })

    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    mockStore = TestBed.inject(MockStore)

    spyOn(mockStore, 'dispatch')

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })
})
