import * as SHA256 from  'crypto-js/sha256';

index: number;
timestamp: any;
data: any;
previousHash: string = null;
hash: string = null;

constructor(index, timestamp, data, previousHash, hash){
  this.index = index;
  this.timestamp = timestamp;
  this.data = data;
  this.previousHash = previousHash;
  this.hash = hash;
  
}