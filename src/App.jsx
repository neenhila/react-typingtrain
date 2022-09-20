import React from 'react';
import Input from './Input.jsx'
import Numbers from './Numbers.jsx'
import Word from './Word.jsx'
import './app.css';
import axios from 'axios'
function App(props) {

    const [value, setValue] = React.useState("");
    const [number, setNumber] = React.useState(0);
    const [things, setThings] = React.useState({ itemhtml: "", items: [], DataisLoaded: false, isFinished: false, timeFinish: false })
    const [score, setScore] = React.useState(0);
    const [maxScore, setMaxScore] = React.useState(1000000000);
    const [time, setTimer] = React.useState({ minutes: 0, seconds: 0, totalSeconds: 0, isStarted: false, timeFinished: false })
    const scoreAdd = () => {
        setScore(score + 1);
    }
    const scoreLose = () => {
        setScore(score - 2);
    }
    const startTime = () => {
        let minutes = document.getElementById("minutes");
        let seconds = document.getElementById("seconds");
        let interval = setInterval(() => {

            if (Number(seconds.innerText) == 0 && Number(minutes.innerText) > 0) {
                seconds.innerText = "59";
                minutes.innerText = Number(minutes.innerText) - 1;
            } else {
                if (Number(seconds.innerText) > 0) {
                    seconds.innerText = Number(seconds.innerText) - 1

                } else {
                    setTimer({ timeFinished: true, minutes: 0, seconds: 0, isStarted: false, ...time })
                    setThings({ isFinished: true, timeFinish: true, ...things })
                    clearInterval(interval)
                    
                };
            }

        }, 1000)
    }
    let ref3 = React.useRef(time.isStarted);
    const getValue = (val) => {
        if (!ref3.current) {
            ref3.current = true;
            setTimer({ isStarted: true, ...time })
            startTime();
        }
        setValue(val)
        if (things.items.length > 0) {
            if (value == things.items[0].madde) {
                let htmlIDFind = things.items[0].madde;
                let deleteHtml = `<p class="word" id="${things.items[0].madde_id}">${htmlIDFind}</p>`
                let copyArray = Array.from(things.items);
                copyArray.shift();
                setThings({ itemhtml: things.itemhtml.slice(deleteHtml.length, things.itemhtml.length), DataisLoaded: true, items: copyArray })
                setValue("");
            } else return;
        } else {
            setThings({ isFinished: true, ...things })
        }
    }
    const getNumber = (num) => {
        setNumber(num)
    }
    let ref = React.useRef(number)
    let ref2 = React.useRef({ load: things.DataisLoaded, thing: things.itemhtml });
    React.useEffect(() => {
        if (number < 1) return;
        if (ref.current == number) {
            ref2.current.thing = things.itemhtml;
            if (things.isFinished) {
                console.log(1)
            }
            if (things.items.length == 0) {
                setThings({ isFinished: true, ...things })
            }
        } else {
            if (ref2.current.load && ref2.current.thing == things.itemhtml) return;
            axios.get(
                `https://random-turkish-word-api.herokuapp.com/words?number=${number}`)
                .then((res) => {
                    let data = res.data;
                    let itemshtml = "";
                    let items = [];
                    let letterCount = 0;
                    data.forEach(word => {
                        let html = `<p class="word" id="${word.madde_id}">${word.madde}</p>`
                        itemshtml += html;
                        items.push(word)
                        letterCount += word.madde.trim().replaceAll(" ", "").length;
                    })
                    setMaxScore(letterCount + number);
                    if (ref2.current.thing == "") {
                        setThings({
                            itemhtml: itemshtml,
                            items: items,
                            DataisLoaded: true
                        })
                    }

                    let numberEnum = {
                        30: { minutes: 1, seconds: 30, totalSeconds: 90 },
                        50: { minutes: 2, seconds: 30, totalSeconds: 150 },
                        75: { minutes: 3, seconds: 30, totalSeconds: 210 },
                        100: { minutes: 4, seconds: 30, totalSeconds: 270 },

                    }
                    let timerData = numberEnum[number]
                    console.log(timerData)
                    setTimer({ minutes: timerData.minutes, seconds: timerData.seconds, totalSeconds: timerData.totalSeconds, isStarted: false, timeFinished: false })
                })
            ref.current = number;
        }




    }, [time, number, things.itemhtml])
    return (
        <>
            <div className="timer">
                <span className='minutes' id="minutes">{time.minutes}</span>:<span className='seconds' id="seconds">{time.seconds}</span>
            </div>
            <div className="itembank">
                {number < 1 ? <Numbers getNumber={getNumber} /> : <Word things={things} setThings={setThings} number={number} score={score} maxScore={maxScore} timeFinish={things.timeFinish} />}
            </div>
            <Input getValue={getValue} value={value} things={things} reduce={scoreLose} increment={scoreAdd} />
        </>
    )
}


export default App;