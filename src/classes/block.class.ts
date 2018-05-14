import * as SHA256 from  'crypto-js/sha256';

export class Block {
  index: number;
  timestamp: any;
  data: any;
  previousHash: string = null;
  hash: string = null;

  constructor(index, timestamp, data, previousHash){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();

  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
  
}
