import React, {useState, Fragment} from 'react';
import { TeacherContext } from '../index/Context';



export default function WOTD(props) {
    const [word, setWord] = useState(null)
    const [sentence, setSentence] = useState(null)
    const [data, setdata] = useState(props.teacher_data)

    const submitWOTD = (e, f = null) => {
        e.preventDefault();

        let newWord;
        (f) ? newWord = f : newWord = word
        
        // let inputWOTD = {
        //     task_code: 'WOTD',
        //     task_date: null,
        //     student_id: 
        // }
    }

    return (
        
    <TeacherContext.Consumer>
    
        {context => (
               <div>
        {context.wotd ? (
            <Fragment>
                <h1>Create {context.wotd} as a Word of the Day Task</h1>
                <form onSubmit={e => submitWOTD(e, context.wotd)}>
                    <label> 
                        <p>Create an example sentence</p>
                        <input name="sentence" onChange={e => setSentence(e.target.value)} placeholder={"example sentence for " + context.wotd}/>
                        <button type="submit">Submit {context.wotd}</button>
                    </label>
                </form>
            </Fragment>
        ) : 

            <form onSubmit={submitWOTD}>
                <label>
                    <p>Enter a word for Word of the Day Task</p>
                    <input placeholder="vocabulary word" name="vocab" onChange={e => setWord(e.target.value)}/>
                </label>
                <label>
                    <p>Enter an example sentence for the word</p>
                    <input placeholder="example sentence" onChange={e => setSentence(e.target.value)} name="sentence" />
                </label>
        <button type="submit">Submit {word? word : 'word'}</button>
            </form>

        }

        {data.vocabularies.length > 1 ? (<div>
            <h2>Vocabulary words to choose from</h2>
            {data.vocabularies.map((word, key) => {

                return <button key={key} onClick={e => context.setWOTD(word.vocabulary_word)}>{word.vocabulary_word}</button>
            })}
        </div>) : null}

    </div> 
        )}
    </TeacherContext.Consumer>
)
}