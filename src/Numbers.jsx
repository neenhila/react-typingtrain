import React from 'react';
import './numbers.css';


function Numbers(props) {
    return (
        <div className='numbers'>
            <p>Kaç adet kelime ile kendinizi test etmek istiyorsunuz?</p>
            <div className="buttons">
                <button className='numberButtons' onClick={() => props.getNumber(30)}>30</button>
                <button className='numberButtons' onClick={() => props.getNumber(50)}>50</button>
                <button className='numberButtons' onClick={() => props.getNumber(75)}>75</button>
                <button className='numberButtons' onClick={() => props.getNumber(100)}>100</button>
            </div>
        </div>
    )
}

export default Numbers;