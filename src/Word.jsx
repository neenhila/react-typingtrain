import React from 'react';
import './word.css'
import FinishScore from './FinishScore.jsx'
function Word(props) {

    return (
        <div className="words" id="words">
            {(props.things.DataisLoaded && !props.things.isFinished && props.things.items.length > 0) ? props.things.items.map(item => {
                return (<p className='word' id={item.madde_id} key={item.madde_id}>{item.madde}</p>)
            }) : ((props.things.DataisLoaded && props.things.isFinished) ? <FinishScore score={props.score} maxScore={props.maxScore} timeFinish={props.timeFinish} /> : <h1>Kelimeler alınıyor. Lütfen bekleyin...</h1>)}
        </div>
    )
}

export default Word;
