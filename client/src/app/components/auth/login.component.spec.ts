import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component'
import { StoreModule } from '@ngrx/store'

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore()]
    })

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    mockStore = TestBed.inject(MockStore)

    spyOn(mockStore, 'dispatch')

    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })
})
