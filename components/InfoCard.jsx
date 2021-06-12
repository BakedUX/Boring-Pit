import React, { useState } from 'react'
import styled from 'styled-components'
import InfoModal from '../components/InfoModal'

export default function InfoCard() {
const [isOpen, setIsOpen] = useState(false)
  return (
      <CardWrapper>
        <Text>
          Come get your limited time shades for a Boring Summer!
          Choose between <i>OrangeCrush</i> or <i>BlueWave</i> on redemption.

          <br />
          <br />
          shipping worldwide.
          <a
          onClick={() => setIsOpen(true)}
          style={{
            color: '#e9950d',
            fontWeight: 500,
          }}> &nbsp;Learn More
        </a>
        </Text>
        <InfoModal open={isOpen} onClose={() => setIsOpen(false)} />
      </CardWrapper>

  )
}

const CardWrapper = styled.div`
  background: #EFEDF9;
  border-radius: 0 0 20px 20px;
  color: #000;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: default;
  padding: 26px;
  margin-top: -16px;
  z-index: -2;
`

const Text = styled.p`
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  margin: 0;
`
