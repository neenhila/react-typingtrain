import React from 'react';
import ReactHTMLParser from 'react-html-parser'
import './word.css'
import FinishScore from './FinishScore.jsx'
function Word(props) {

    return (
        <div className="words">
            {(props.things.DataisLoaded && !props.things.isFinished && props.things.items.length > 0) ? ReactHTMLParser(props.things.itemhtml) : ((props.things.DataisLoaded && props.things.isFinished) ? <FinishScore score={props.score} maxScore={props.maxScore} timeFinish={props.timeFinish} /> : <h1>Kelimeler alınıyor. Lütfen bekleyin...</h1>)}
        </div>
    )
}

export default Word;