import React from 'react';


import './FinishScore.css'


function FinishScore(props) {
    return (
        <div className="scoreboard">
            {props.timeFinish ? <h4>Zamanınız tükendi...</h4> : ""}
            <span>Skorunuz</span>
            {props.score ? `${props.score}/${props.maxScore}` : "NaN/NaN"}
            <button id="tekrarOyna" onClick={() => window.location.reload()}>Tekrar oyna!</button>
        </div>
    )
}

export default FinishScore