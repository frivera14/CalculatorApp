import {useState } from "react";

function Calculator() {
    const [formula, setFormula] = useState({ first: '', ops: 0, second: '', total: '' })
    const [display, setDisplay] = useState('')
    const [history, setHistory] = useState([])
    const [checked, setCheck] = useState(false)
    const numHash = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const operators = [

        { name: '+', func: (a, b) => { return a + b } },
        { name: '-', func: (a, b) => { return a - b } },
        { name: '*', func: (a, b) => { return a * b } },
        { name: "÷", func: (a, b) => { return (a / b).toFixed(4) } }];

    const inputFunc =  (letter) => {
        if (display == formula.total) {
            setDisplay('' + letter)
        } else {
            setDisplay(display + letter)
        }
    }
    const resetter = (type) => {
        setFormula({first: parseInt(display), ops: type })
        setDisplay('')
    }
    

    const solution = () => {
        let answer = operators[formula.ops].func(formula.first, parseInt(display))
        setDisplay(answer)
        setFormula({total: answer})
        history.push({first: formula.first, ops: operators[formula.ops].name, second: parseInt(display), total: answer})
        setHistory(history)    
    }

    const triggerHx = () => {
        checked ? setCheck(false) : setCheck(true)
    }

    return (
        <>
            <input disabled={true} className="inputShit" value={display} />
            <section className="flexer">

                <div className="calcGrid">

                    {numHash.map((e, key) => (
                        <button onClick={() =>{inputFunc(e)}} value={e} key={key} type="button">
                            <p>{e}</p>
                        </button>
                    ))}

                </div>
                <div className="operations">
                    {operators.map((e, key) => (
                        <button onClick={() => resetter(key)} key={key}>{e.name}</button>
                    ))}
                </div>
                <div className="funcButts">

                    <button id="clear" onClick={() => { setDisplay('') }}>Clear</button>
                    <button onClick={() => triggerHx()}>History</button>
                    <button style={{flex: '1'}} onClick={() => solution()}>=</button>
                </div>
            </section>
            <div className="sideStaff" style={{display: checked ? 'block' : 'none'}}>
                {history.map((each, key) => (
                    <p key={key}>{each.first} {each.ops} {each.second} = {each.total}</p>
                ))}
            </div>

        </>
    )
}

export default Calculator