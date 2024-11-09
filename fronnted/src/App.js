import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [transfers, setTransfers] = useState([]);

  const fetchTransfers = async () => {
    try {
      const response = await axios.post('<YOUR_SUBGRAPH_URL>', {
        query: `
          {
            transfers(first: 10, orderBy: timestamp, orderDirection: desc) {
              id
              from
              to
              value
              timestamp
            }
          }
        `,
      });
      setTransfers(response.data.data.transfers);
    } catch (error) {
      console.error('Error fetching transfers:', error);
    }
  };

  useEffect(() => {
    fetchTransfers();
    const interval = setInterval(fetchTransfers, 60000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>USDC Transfers to Target Address</h1>
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id}>
              <td>{transfer.from}</td>
              <td>{transfer.to}</td>
              <td>{transfer.value.toString()}</td>
              <td>{new Date(transfer.timestamp * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
