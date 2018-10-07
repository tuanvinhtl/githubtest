import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class LoginService {

  constructor(private dataBase: AngularFireDatabase) { }

  getData(prefix: string) {
    return this.dataBase.list(prefix);
  }
}
