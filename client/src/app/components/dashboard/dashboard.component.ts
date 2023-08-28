import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { checkUsername } from 'src/app/store/app.actions'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(checkUsername())
  }
}
