import { Component } from '@angular/core';
import { CryptoService } from './services/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  blockchain = '';
  balance: number = 0;
  
  constructor(private cryptoSvc: CryptoService ){
    this.blockchain = JSON.stringify(this.cryptoSvc.cryptoChain)
  }
}
