import React from 'react';
import './Input.css';

function Input(props) {

    return (
        <input className="typingInput" type="text" placeholder='Geri sayım yazmaya başladığınızda otomatik olarak başlayacaktır.' onChange={(e) => {
            props.getValue(e.target.value);

            if (props.value.charAt(props.value.length - 1) == props.things.items[0].madde.charAt(props.value.length - 1)) {
                if (props.things.items[0].madde.charAt(props.value.length - 1) == " ") return;
                props.increment();
            } else {
                if (props.things.items[0].madde.charAt(props.value.length - 1) == " ") return;
                props.reduce();
            }
        }} value={props.value} disabled={props.things.DataisLoaded ? false : true}></input>
    )
}

export default Input;