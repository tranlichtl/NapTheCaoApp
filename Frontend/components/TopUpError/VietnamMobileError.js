import React from 'react'

const VietnamMobileError = (serial, cardCode) => {
    return (serial.length < 11 && cardCode.length < 12)
}

export default VietnamMobileError