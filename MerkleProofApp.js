import React, {useState} from 'react';
import Web3 from 'web3';

const web3 = new Web3('https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID');

const MerkleProofApp =  () => {
  const [transactionHash, setTransactionHash] = useState('');
  const [proof, setProof] = useState('');
  const[result, setResult] = useState(null);

  const verifyTransaction = async() => {
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const contractABI = [/* ABI from your deployed contract */];
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const isValid = await contract.methods.verifyTransaction(transactionHash, proof.split(',')).call();
    setResult(isValid);
  };

  return (
    <div>
     <h1>Merkle Proof Verification</h1>
     <input type="text" placeholder = "Transaction Hash" onChange = {e => setTransactionHash(e.target.value)} />
     <input type="text" placeholder = "Merkle Proof (comma separated)" onChange = {e => setProof(e.target.value)} />
     <button onClick = {verifyTransaction}>Verify</button>
     {result !=== null && <p>Verification Result: {result ? 'Valid' : 'Invalid'}</p>}
    </div>
  );
};

export default MerkleProofApp;

  
