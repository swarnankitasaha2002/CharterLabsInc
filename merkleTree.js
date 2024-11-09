const { MerkleTree } = require('merkletreejs');
const keccak256 = require('crypto-js/keccak');

function generateMerkleTree(transactions) {
  const transactionHashes = transactions.map(tx => keccak256(tx.hash).toString());
  const tree = new MerkleTree(transactionHashes, keccak256, {sort: true});
  const root = tree.getRoot().toString('hex');

  return {tree, root};
}

function getMerkleProof(tree, transactionHash) {
  return tree,getProof(transactionHash).map(p => p.data.toString('hex'));
}

module.exports = {generateMerkleTree, getMerkleProof};
