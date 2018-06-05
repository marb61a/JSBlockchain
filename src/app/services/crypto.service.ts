import { Injectable } from '@angular/core';
import { Blockchain } from '../../classes/blockchain.class';
import { Block } from '../../classes/block.class';
import { Transaction } from '../../classes/transaction.class';

@Injectable()
export class CryptoService {
  cryptoChain = new Blockchain();
  unminedTxns: Transaction[] = [];

  constructor() {
    this.unminedTxns.push(new Transaction(Date.now(), "wallet-Alice", "wallet-Bob", 50));
    this.unminedTxns.push(new Transaction(Date.now(), "wallet-Bob", "wallet-Alice", 25));
    
    console.log("\nMining a block");
    this.cryptoChain.mineCurrentBlock("wallet-Miner49er", this.unminedTxns).then(() => {
      console.log("\nBalance Alice : " + this.cryptoChain.getAddressBalance('wallet-Alice')); 
      console.log("\nBalance Bob : " + this.cryptoChain.getAddressBalance('wallet-Bob'));   
      console.log("\nBalance Miner49er : " + this.cryptoChain.getAddressBalance('wallet-Miner49er'));   
    });
  }

}
