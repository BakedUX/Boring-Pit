import React from 'react'
import styled from 'styled-components'

export default function InfoModal({open, onClose}) {
if (!open) return null

  return (

        <>
        <OVERLAY_STYLES> </OVERLAY_STYLES>
        <CardWrapper>
        <div className="TitleCard">
          <Title><img
        height="24px"
        width="24px"
        src="/BoringTestPic.png"   //**REPLACE**
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
      /> $BOPVIP</Title>
                </div>
                <br />
          <Text>
            <b>TL:DR??:</b>
          <br />
          $BOPVIP is a token that allows you entry into a lottery
          for limited editon Boring Summer sunglasses
          </Text>
          <br />
          <Text>
            <b>How it’s priced: </b>
          <br />
          $BOPVIP tokens are listed starting at $420.69 USDC.
          The increase or decrease in price after a purchase follows a &nbsp;
          <a style={{textDecoration: 'underline'}} href="https://blog.relevant.community/bonding-curves-in-depth-intuition-parametrization-d3905a681e0a">
            bonding curve
          </a>.
          <br />
          <br />
          <b>Disclaimer:</b>
          <br />
          The redeemable token is <b>not connected</b> to our protocol and governance. This is an unaudited smart contract; the smart contract code can be found <a style={{textDecoration: 'underline'}} href="https://github.com/blockworks-foundation/solana-program-library/tree/caps">here.</a>
          </Text>
          <br />
          <button onClick={onClose}>Close</button>
        </CardWrapper>
        </>
  )
}

const CardWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: auto;
  background: #EFEDF9;
  border-radius: 20px;
  color: #000;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  cursor: default;
  padding: 24px;
  z-index: 1000;
`

const Text = styled.p`
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  margin: 0;
`
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
const Title = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 126.7%;
  width: 100%;
  margin: 0;
  vertical-align: middle;
`
