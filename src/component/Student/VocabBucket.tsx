import React, { useState, useEffect, Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_VOCABULARY } from '../../mutation/mutation';
import { ADD_VOCABULARY } from '../../mutation/mutation';
import '../../styles/vocabulary.styl';
import { StudentContext } from '../index/Context';



function ListBucket(props) {
  //the individual words that are in the database
  const [removeVocab] = useMutation(REMOVE_VOCABULARY);


  const [word, addWord] = useState(props)
  const removeWord = (e) => {
    //when x is clicked have a confirmation message and then remove
    const yesOrNo = confirm(`Do you want to delete the word: ${word.word.vocabulary_word}?`)
    if (yesOrNo == true) {
      removeVocab({ variables: { vocab_id: e.target.name } }).then((e) => {
        location.reload();
      })
    }
  }

  return (
    <div className="section-word">
      <StudentContext.Consumer>
        {context => (<Fragment>
          <p onClick={e => context.lookUp(word.word.vocabulary_word)} className={props.dupeWord === word.word.vocabulary_word || props.dupeWordt === word.word.vocabulary_word ? 'vocabulary duped' : 'vocabulary'}>{word.word.vocabulary_word}</p>
          <button className="not-button" name={word.word.vocab_id} onClick={removeWord}>×</button>
        </Fragment>
        )
        }
      </StudentContext.Consumer>

    </div>)
}

export default function VocabBucket(props) {
  const [addVocab, { data }] = useMutation(ADD_VOCABULARY);
  const [dupeWord, setDupeWord] = useState('')

  const submitVocabulary = (e, word) => {
    e.preventDefault();
    //before adding the word manually, let's capitalize the first letter
    if (word) {
      let formattedWord = word.charAt(0).toUpperCase() + word.slice(1)
      let isMatch = false;
      if (props.vocab) {
        for (let x of props.vocab) {
          if (x.vocabulary_word === formattedWord) {
            isMatch = true;
            break;
          }
        }
        if (!isMatch) {
          //save to database if word doesn't already exist
          addVocab({
            variables: {
              input: {
                student_id: props.student_id,
                teacher_id: props.teacher_id,
                vocabulary_word: formattedWord,
              }
            }
          }).then((e) => {
            //then let's show it
            props.showVocab(formattedWord)
          }).catch((err) => console.log(err))
        } else {
          setDupeWord(formattedWord)
        }
      }
    }

  }



  return (
    <div className="vocab-bucket">
      <StudentContext.Consumer>
        {context => (
          <Fragment>

            <form onSubmit={e => submitVocabulary(e, context.vocabulary)}>
              <label htmlFor="vocab"><h2>Vocabulary Bucket</h2></label>
              <input id="vocab" list="wordlist" placeholder="Add Word to Bucket" onChange={e => context.spellCheck(e.target.value)} />
              <datalist id="wordlist">
              {context.listWords && context.listWords.map((word, key) => {
                return <option key={key} index={key} value={word} />
              })}
              </datalist>
              <button type="submit" className="submit-word">submit {context.vocabulary ? context.vocabulary : 'word'}</button>
            </form>

            <h3>Vocabularies</h3>
            <div className="list-of-vocabularies">

              {props.vocab.map((wordt, key) => {
                return <ListBucket
                  dupeWordt={props.dupeWord}
                  dupeWord={dupeWord}
                  word={wordt}
                  key={key}
                  index={key} />
              })}


              {context.def && (
                <div>
                  <div className="x-close" onClick={e => context.setVocabulary(null)}>close</div>
                  <h3>{context.vocabulary}</h3>

                  {context.def && context.def.map((indi, key) => {
                    return <span key={key} >{indi[0]} <p>{indi[1]}</p></span>
                  })}
                </div>
              )}

            </div>
          </Fragment>)}
      </StudentContext.Consumer>

    </div>


  )
}