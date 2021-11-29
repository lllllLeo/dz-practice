import { useState, useRef } from 'react';
import './UndoRedo.css'

export default function UndoRedo() {
    const inputRef = useRef(null); //함수가 반환되고 컨텐츠가 렌더링 될 떄까지 참조가 설정되지 않으므로 null
    const [inputNumber, setInputNumber] = useState();
    const [resultNumber, setResultNumber] = useState([0]);
    const [index, setIndex] = useState(0);
    
    const buttonFunction = {
        undoButton: () => {
            // setIndex(prevState => prevState - 1);						1
            // setIndex(index - 1);															2
        },
				addButton: () => {
					addSubCheck()
					setResultNumber([...resultNumber.slice(0, index + 1), resultNumber[index] + inputNumber]);
        },
				SubButton: () => {
					addSubCheck()
					setResultNumber([...resultNumber.slice(0, index + 1), resultNumber[index] - inputNumber]);
				},
        redoButton: () => {
            // setIndex(prevState => prevState + 1);            1
            // setIndex(index + 1);                             2
        }
    }

		const addSubCheck = () => {
			if(inputRef.current.value === '') {  // inputNumber로도 가능
				inputRef.current.focus();
				return;
			}
			setIndex(prevState => prevState + 1);
			setInputNumber('');
			inputRef.current.focus();
		}

    return (
        <div className={"container"}>
            <div id={"valuebox"} className={"counter"} value={resultNumber[index]}>{resultNumber[index]}</div>
            <input ref={inputRef} id={"inputbox"} className={"input"} value={inputNumber || ''} onChange={(e) => setInputNumber(Number(e.target.value))}/>
            <div className={"btnGroup"}>
                {/* <button id={"undoButton"} className={"btn"} onClick={buttonFunction.undoButton} disabled={index > 0 ? false : true}>Undo</button> 			1   2*/}
                <button id={"undoButton"} className={"btn"} onClick={() => setIndex(index - 1)} disabled={index > 0 ? false : true}>Undo</button>
                <button id={"addButton"} className={"btn"} onClick={buttonFunction.addButton}>+</button>
                <button id={"subButton"} className={"btn"} onClick={buttonFunction.SubButton}>-</button>
                {/* <button id={"redoButton"} className={"btn"} onClick={buttonFunction.redoButton} disabled={index === resultNumber.length - 1 ? true : false}>Redo</button>      1   2 */}
                <button id={"redoButton"} className={"btn"} onClick={() => setIndex(index + 1)} disabled={index === resultNumber.length - 1 ? true : false}>Redo</button>
            </div>
        </div>
    )
}


/* 

        // addSubButton: (e) => {
        //     if(inputRef.current.value === '') {  // inputNumber로도 가능
        //         inputRef.current.focus();
        //         return;
        //     }
        //     setIndex(prevState => prevState + 1);
        //     setInputNumber('');
        //     inputRef.current.focus();
        //     if(e.target.id === 'addButton') {
        //         setResultNumber([...resultNumber.slice(0, index + 1), resultNumber[index] + inputNumber]);
        //     } else {
        //         setResultNumber([...resultNumber.slice(0, index + 1), resultNumber[index] - inputNumber]);
        //     }
        // },

*/