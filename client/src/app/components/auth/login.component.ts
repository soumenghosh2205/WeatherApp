import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { setUsername } from "src/app/store/app.actions";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = ''

  constructor(private store: Store) { }

  setUsername() {
    if (this.username) {
      this.store.dispatch(setUsername({ username: this.username }))
    }
  }

}
