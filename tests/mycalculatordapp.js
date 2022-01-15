const anchor = require('@project-serum/anchor');
const assert = require('assert');
const { SystemProgram } = anchor.web3;


describe('mycalculatordapp', () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mycalculatordapp;
  let _calculator;

  it('creates a calculator', async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [calculator]
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "Welcome to Solana");
    _calculator = calculator;
  });

  it('adds two numbers',async () => {
    const calculator = _calculator;

    await program.rpc.add(new anchor.BN(20), new anchor.BN(30), {
      accounts: {
        calculator: calculator.publicKey
      }
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(50)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it('multiplies two numbers',async () => {
    const calculator = _calculator;

    await program.rpc.multiply(new anchor.BN(7), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey
      }
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(21)));
    assert.ok(account.greeting === "Welcome to Solana");
    
  });

  it('subtracts two numbers',async () => {
    const calculator = _calculator;

    await program.rpc.subtract(new anchor.BN(20), new anchor.BN(11), {
      accounts: {
        calculator: calculator.publicKey
      }
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(9)));
    assert.ok(account.greeting === "Welcome to Solana");
    
  });

  it('divides two numbers',async () => {
    const calculator = _calculator;

    await program.rpc.divide(new anchor.BN(15), new anchor.BN(6), {
      accounts: {
        calculator: calculator.publicKey
      }
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(2)));
    assert.ok(account.remainder.eq(new anchor.BN(3)));
    assert.ok(account.greeting === "Welcome to Solana");
    
  });

})
