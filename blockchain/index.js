const Block = require('./block')

class Blockchain{
    constructor(){
        this.chain=[Block.genesis()];
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        console.log("next for loop starts");
        for (let i=1; i<chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];

            if (block.lastHash!== lastBlock.hash || 
                block.hash !== Block.blockHash(block)) {
                    console.log('before',block.data,block.lastHash,block.timestamp,block.nonce,block.difficulty);
                    console.log(block.hash,Block.blockHash(block));
                return false;
            }

        }
        console.log("marking as true");
        return true;
    }

    replaceChain(newChain){
        if (newChain.length <= this.chain.length){
            console.log("Recieved chain is not longer than the current chain");
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log('Received chain is not a valid');
            return;
        }
        console.log('Replacing blockchain with the new chain');
        this.chain=newChain;
    }
}

module.exports = Blockchain;