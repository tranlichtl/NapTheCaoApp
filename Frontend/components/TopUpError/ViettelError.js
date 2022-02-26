import React from 'react'

const ViettelError = (serial, cardCode) => {
    return (serial.length < 11 && cardCode.length < 13)
}

export default ViettelError