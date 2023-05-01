import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import QuestionsData from "../data/Data";

const Quiz = () => {
    const [current, setCurrent] = useState(0);
    const [selectChoice, setSelectChoice] = useState('') //กำหนดตัวเลือก ที่ผู้ใช้ทำการเลือก
    const { score, setScore, setAppState } = useContext(DataContext) //เรียกใช้ DataContext

    useEffect(() => { // ตรวจสอบว่ามีการเปลี่ยนแปลงค่าในตัวเลือกหรือเปล่า ถ้ามีการเปลี่ยนแปลงค่า แสดงว่าผู้ใช้ทำการเลือกตัวเลือกแล้ว
        checkAnswer()
        // eslint-disable-next-line
    }, [selectChoice])

    const checkAnswer = () => {
        if (selectChoice !== "") {
            if (selectChoice === QuestionsData[current].answer) { // selectChoice ที่เลือก ตรงกับ คำตอบหรือเปล่า
                setScore(score + 1); //เมื่อตอบถูก score +1 
                nextQuestion();
            } else {
                nextQuestion();
            }
        }
    }

    const nextQuestion = () => { //ไปคำถามถัดไป
        setSelectChoice("") //เคลียร์ selectChoice
        if (current === QuestionsData.length - 1) {
            setAppState("score")
        } else {
            setCurrent(current + 1)
        }

    }

    return (
        <div className="quiz">
            <h1>{QuestionsData[current].question}</h1>
            <div className="choice">
                <button onClick={() => setSelectChoice("A")}>{QuestionsData[current].A}</button>
                <button onClick={() => setSelectChoice("B")}>{QuestionsData[current].B}</button>
                <button onClick={() => setSelectChoice("C")}>{QuestionsData[current].C}</button>
                <button onClick={() => setSelectChoice("D")}>{QuestionsData[current].D}</button>
            </div>
            <p>{`${current + 1} / ${QuestionsData.length}`}</p>
        </div>

    )
}

export default Quiz;