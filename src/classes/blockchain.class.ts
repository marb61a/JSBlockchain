import * as SHA256 from  'crypto-js/sha256';
import { Block } from './block.class';

export class Blockchain {
  chain: Block[];
  difficulty: number = 0;
  
  constructor(){
    this.chain = [this.createGenesisBlock()];
    
  }
  
  createGenesisBlock(){
    return new Block(0, "07/05/2018", "Genesis Block", "0");
  }
  
  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }
  
  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
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