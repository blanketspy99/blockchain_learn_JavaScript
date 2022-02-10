const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain',() =>{
    let bc, bc2;

    beforeEach(() => {
        bc=new Blockchain();
        bc2=new Blockchain();

    });

    it('starts with genesis block', () =>{
        expect(bc.chain[0]).toEqual(Block.genesis());

    });

    it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    })

    it('validates a valid chain', () => {
        bc2.addBlock('foo');
        console.log('bc2',bc2.chain[1].hash);
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });
    it('validates a chain with  corrupt genesis block', () => {
        bc2.chain[0].data = 'Bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces the chain with the valid Chain', () => {
        bc2.addBlock('goo');
        console.log(bc2.length);
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });
    it('does not replace chain with one of lesss than or equla to length', ()=>{
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    }); 
});