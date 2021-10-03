import './App.css';
import { useState } from 'react';
import { Button, InputGroup,FormControl} from 'react-bootstrap';
import { ethers } from 'ethers'
import PPToken from './artifacts/contracts/PPToken.sol/PPToken.json'


const tokenAddress = "0xBf2Ae5F6040a79f7e094D81e362334f5f166EF03"

function App() {
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()
  const [mintCount, setMintCount] = useState(0)
  const [ethForMint, setEthForMint] = useState('')

  function handleMint(val) {
    setMintCount(val);
    setEthForMint(val);
  }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, PPToken.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const contract = new ethers.Contract(tokenAddress, PPToken.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function mintToken() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log('PPToken abi', PPToken.abi);
      console.log('signer', signer);
      const contract = new ethers.Contract(tokenAddress, PPToken.abi, signer);
      const transaction = await contract.mintPPT(signer.getAddress(), mintCount);
      // const transaction = await contract.mintPPT(signer.getAddress(), mintCount, { value : ethers.utils.parseEther('0.000000001')});
      await transaction.wait();
    } 
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <InputGroup className="mb-3 initial-width">
            <FormControl
              placeholder="New PPT token count"
              aria-label="Ether Amount"
              aria-describedby="basic-addon1"
              onChange={e => handleMint(e.target.value)}
            />
            <InputGroup.Text id="basic-addon1">PPT</InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3 initial-width">
            <FormControl
              placeholder="Consume ETH"
              aria-label="Consume ETH"
              aria-describedby="basic-addon1"
              disabled
              value= { ethForMint }
            />
            <InputGroup.Text id="basic-addon1">gWei</InputGroup.Text>
          </InputGroup>
          <Button variant="secondary" size="md" onClick={mintToken}>
            Mint
          </Button>
          <hr className="divider"/>
          <FormControl
            className="initial-width"
            placeholder="Target Address"
            aria-label="Target Address"
            onChange={e => setUserAccount(e.target.value)}
          />
          <InputGroup className="mb-3 initial-width">
            <FormControl
              className="mt-20"
              placeholder="Amount"
              aria-label="Amount"
              onChange={e => setAmount(e.target.value)}
            />
            <InputGroup.Text className="mt-20" id="basic-addon1">PPT</InputGroup.Text>
          </InputGroup>
          <Button variant="secondary" size="md" onClick={sendCoins}>
            Send
          </Button>
          {/* <button onClick={fetchGreeting}>Fetch Greeting</button>
          <button onClick={setGreeting}>Set Greeting</button>
          <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />

          <br />
          <button onClick={getBalance}>Get Balance</button>
          <button onClick={sendCoins}>Send Coins</button>
          <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
          <input onChange={e => setAmount(e.target.value)} placeholder="Amount" /> */}
        </header>
      </div>
    </div>
  );
}

export default App;
