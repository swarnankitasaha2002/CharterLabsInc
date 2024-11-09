const Web3 = require('web3');

async function fetchTransactions(blockNumber) {
  const web3 = new Web3('https://sepolia.infura.io/v3/YOUR_PROJECT_ID');
  const block = await web3.eth.getBlock(blockNumbr, true);
  return block.transactions;
}

module.exports = fetchTransactions;
