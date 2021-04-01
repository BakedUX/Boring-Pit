import React, { useState } from 'react'
import styled from 'styled-components'

import IncrementToken from './IncrementToken'
import Gallery from './Gallery'
import { bgConnected, bgDisconnected } from './WalletButton'
import { useAccounts } from '../providers/accounts'
import { useConnection } from '../providers/connection'
import { usePrice } from '../providers/price'
import { usePool } from '../providers/pool'
import { useWallet } from '../providers/wallet'
import { cache, redeem } from '../lib/pool'


import {
  PublicKey,
} from "@solana/web3.js";


export default function RedeemModal({open, onClose}) {

  if (!open) return null

  const { connection, config } = useConnection();
  const { wallet, connected } = useWallet();
  const { walletCapAccount, walletUsdAccount } = useAccounts();
  const { pool } = usePool();
  const {
    amountToSell,
    setAmountToSell,
    amountAvailable,
    price,
    formattedPrice
  } = usePrice();

  const [redeeming, setRedeeming] = useState(false);
  const [address, setAddress] = useState('');


  const handleClick = async function() {

    if (!connected) {
      wallet.connect();
      return
    }

    try {
      setRedeeming(true);
      const programIds = {
        token: new PublicKey(config.tokenProgramId),
        swap: new PublicKey(config.swapProgramId) };

      const createOrderRes = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address : 'Neverland' }),
      });

      const order = await createOrderRes.json();

      const txHash = await redeem(connection, wallet, walletCapAccount, amountToSell, order.id.toString(), programIds);

      await fetch(`/api/order/${order.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash }),
      });

    } catch (e) {
      console.error(e);
    } finally {
      setRedeeming(false);
    }
  };

  const loadingAccounts = connected && !(walletUsdAccount && walletCapAccount && pool && !redeeming)

  // TODO: add google autocomplete?: https://www.tracylum.com/blog/2017-05-20-autocomplete-an-address-with-a-react-form/

  return (
    <>
        <OVERLAY_STYLES> </OVERLAY_STYLES>
        <CardWrapper>
          <Title>Redeem Mango Market Caps</Title>
          <Gallery />
          <FullWidth>
          <MarketData>
            <span>
                            { /*
              <CurrentPrice>
                ${formattedPrice} USDT &thinsp;
                <img
                  height="17px"
                  width="17px"
                  src="/tether_logo.svg"
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginTop:"-6px",
                  }}/>
              </CurrentPrice>
              */}

            <CapCount>
              {`You own ${amountAvailable}`}
            </CapCount>
          </span>
          <Increment>
             <IncrementToken amount={amountToSell} setAmount={setAmountToSell} min={1} max={amountAvailable} />
          </Increment>
        </MarketData>
          </FullWidth>
        </CardWrapper>
        <InfoCard>
          <TitleSub>Delivery Address:</TitleSub>
          <Input  autocomplete="address-line-1" onChange={(e) => setAddress(e.target.value)} value={address} placeholder="type address" />
          <Button disabled={loadingAccounts} onClick={handleClick} style={{
            background: connected ? bgConnected : bgDisconnected,
            opacity: loadingAccounts ? "50%" : "100%"}}>
            { loadingAccounts && "⏳ (loading) " }
            { wallet && connected ? "Redeem" : "Connect Wallet" }
          </Button>  
          <br />  
          <button onClick={onClose}>Close</button>
        </InfoCard>
        </>
  )
}

const OVERLAY_STYLES = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: .8;
  z-index:998;
`
const FullWidth = styled.div`
  width: 100%;
`

const CardWrapper = styled.div`
  background: #000000;
  background: linear-gradient(162.92deg, #2b2b2b 12.36%, #000000 94.75%);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.4);
  position: fixed;
  width: 400px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px; 
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: default;
  padding: 24px;
  z-index: 1000;
`
const InfoCard = styled.div`
  position: fixed;
  width: 400px;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: auto;
  background: #EFEDF9;
  border-radius: 0 0 20px 20px;
  color: #000;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  cursor: default;
  padding: 24px;
  z-index: 999;
`
const MarketData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-top: 1rem;
`
const CurrentPrice = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin: 0px;
  margin-bottom: 0.5rem;
  font-feature-settings: 'tnum' on, 'onum' on;
`
const CapCount = styled.p`
  color: #aeaeae;
  font-weight: 400;
  margin: 0px;
  font-size: 13px;
  font-feature-settings: 'tnum' on, 'onum' on;
`
const Increment = styled.div`
  /* margin-bottom: -2px; */
`

const Title = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 126.7%;
  width: 100%;
  margin: 0;
`
const TitleSub = styled.p`
  font-weight: 800;
  font-size: 18px;
  line-height: 126.7%;
  width: 100%;
  margin: 0;
  color: #696969;
  padding-left: 10px;
  text-align: center;
  margin-top: 80px;

`
const Price = styled.p`
  font-weight: 800;
  font-size: 44px;
  line-height: 126.7%;
  width: 100%;
  margin: 0;
  padding-left: 10px;
  text-align: center;
`

const Button = styled.button`
  color: #FFFFFF;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 5px 11px rgba(170, 131, 0, 0.29);
  transform: scale(1);
  transition: transform 0.3s ease 0s;
  box-sizing: border-box;
  padding: .87rem;
  line-height: 1;
  margin: 15px 0 0 0;
  letter-spacing: 0.01em;
  align-items: center;

`


const Input = styled.input`
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 5px 11px rgba(170, 131, 0, 0.29);
  transform: scale(1);
  transition: transform 0.3s ease 0s;
  box-sizing: border-box;
  padding: .87rem;
  line-height: 1;
  margin: 15px 0 0 0;
  letter-spacing: 0.01em;
  align-items: center;

`

/*  
These are styles for error button and
disconnected button if it helps!
*/

/*const ButtonDiconnected = styled.button`
  color: #FFFFFF;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 10px;
  transform: scale(1);
  transition: transform 0.3s ease 0s;
  background: linear-gradient(90.85deg, #E54033 -19.66%, #FECA1A 128.7%);
  box-shadow: 0px 5px 11px rgba(170, 131, 0, 0.29);
  box-sizing: border-box;
  padding: .87rem;
  line-height: 1;
  margin: 15px 0 0 0;
  letter-spacing: 0.01em;
  align-items: center;

`
const ButtonError = styled.button`
  color: #E54033;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 10px;
  transform: scale(1);
  transition: transform 0.3s ease 0s;
  background: #E4E1F3;
  border: solid 2px #E54033;
  box-sizing: border-box;
  padding: .87rem;
  line-height: 1;
  margin: 15px 0 0 0;
  letter-spacing: 0.01em;
  align-items: center;

`*/
