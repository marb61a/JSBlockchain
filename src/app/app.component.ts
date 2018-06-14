import { Component } from '@angular/core';
import { CryptoService } from './services/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  walletAddressForm: FormGroup;
  blockchain = '';
  balance: number = 0;
  
  constructor(private cryptoSvc: CryptoService ){
    this.walletAddressForm = this.fb.group({
      walletAddress: ['', Validators.required]
    })
    
    this.blockchain = JSON.stringify(this.cryptoSvc.cryptoChain)
  }
  
  assignWalletAddress(){
    console.log("Called assignWalletAddress");
  }
}
