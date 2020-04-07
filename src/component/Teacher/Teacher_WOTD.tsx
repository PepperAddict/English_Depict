import React, {useState, Fragment} from 'react';
import { TeacherContext } from '../index/Context';

export default function WOTD(props) {
    const [word, setWord] = useState(null)
    const [sentence, setSentence] = useState(null)
    const [data, setdata] = useState(props.teacher_data)

    const submitWOTD = e => {
        e.preventDefault();
        console.log(word)
        console.log(sentence)
    }

    return (
        
    <TeacherContext.Consumer>
    
        {context => (
               <div>
                   {console.log(data)}
        {context.wotd ? (
            <Fragment>
                <h1>Create {context.wotd} as a Word of the Day Task</h1>
                <form onSubmit={submitWOTD}>
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
                return <p key={key}>{word.vocabulary_wrd}</p>
            })}
        </div>) : null}

    </div> 
        )}
    </TeacherContext.Consumer>
)
}