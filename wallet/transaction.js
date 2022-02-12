const ChainUtil = require('../chain-util');

class Transaction {
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs=[];
    }

    static newTransaction(senderWallet, recipient, amount){
        const transation = new this();
        if (amount > senderWallet.balance) {
            console.log(`Amount: ${amount} exceeds balance`);
            return;
        }
    }
}