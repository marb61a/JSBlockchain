import * as SHA256 from  'crypto-js/sha256';
import { Block } from './block.class';
import { Transaction } from './transaction.class';

export class Blockchain {
  chain: Block[] = [];
  difficulty: number = 3;
  miningNumber: number = 50;
  
  constructor(){
    this.chain = [this.createGenesisBlock()];
    
  }
  
  createGenesisBlock(){
    let txn = new Transaction(Date.now(), "mint", "genesis", 0);
    let block = new Block(Date.now(), [txn], "0"); 
    this.chain.push(block);
  }
  
  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }
  
//   addBlock(newBlock){
//     newBlock.previousHash = this.getLatestBlock().hash;
//     newBlock.mineBlock(this.difficulty);
//     this.chain.push(newBlock);
//   }
  
  mineCurrentBlock(minerAddr: string, transactions: Transaction[]): Promise<any> {
    transactions.push(new Transaction(Date.now(), "mint", minerAddr, this.miningReward));
    
    let promise = new Promise((resolve, reject) => {
      let block = new Block(Date.now(), transactions, this.getLatestBlock().hash);
      block.mineBlock(this.difficulty).then(() => {
        console.log("Current block successfully mined");
        this.chain.push(block);
        resolve();
      });
    });
    
    return promise;
  }
  
  getAddressBalance(addr){
    let balance = 0;
    
    for(const block of this.chain){
      for(const txn of txns){
        if(txn.payerAddr === addr){
          balance -= txn.amount;
        }
        
        if(txn.payeeAddr === addr){
          balance += txn.amount;
        }
      }
    }
    
    return balance;
  }
  
  isChainValid(){
    for(let i = 1; i < this.chain.length; i++ ){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      
      // Validate data integrity
      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      
      // Validate the hash chain link
      if(currentBlock.previousHash !== previousBlock.hash){
         return false;
      }
      
      // If there are no bad links or manipulated data
      return true;
    }
  }
}