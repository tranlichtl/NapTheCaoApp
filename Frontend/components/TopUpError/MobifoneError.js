import React from 'react'

const MobifoneError = (serial, cardCode) => {
    return (serial.length < 15 && cardCode.length < 12)
}

export default MobifoneError