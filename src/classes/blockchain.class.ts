import * as SHA256 from  'crypto-js/sha256';
import { Block } from './block.class';
import { Transaction } from './transaction.class';

export class Blockchain {
  chain: Block[];
  difficulty: number = 3;
  miningNumber: number = 50;
  
  constructor(){
    this.chain = [this.createGenesisBlock()];
    
  }
  
  createGenesisBlock(){
    return new Block(0, "07/05/2018", "Genesis Block", "0");
  }
  
  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }
  
//   addBlock(newBlock){
//     newBlock.previousHash = this.getLatestBlock().hash;
//     newBlock.mineBlock(this.difficulty);
//     this.chain.push(newBlock);
//   }
  
  mineCurrentBlock(transactions: Transaction[]): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let block = new Block(Date.now(), transactions, this.getLatestBlock().hash);
      block.mineBlock(this.difficulty).then(() => {
        console.log("Current block successfully mined");
        this.chain.push(block);
      });
    });
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