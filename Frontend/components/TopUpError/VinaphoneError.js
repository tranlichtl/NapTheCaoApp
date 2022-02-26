import React from 'react'

const VinaphoneError = (serial, cardCode) => {
    return (serial.length < 14 && cardCode.length < 14)
}

export default VinaphoneError