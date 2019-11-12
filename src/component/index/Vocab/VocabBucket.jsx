import React, { useState, useEffect, Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_VOCABULARY } from '../../../mutation/mutation';
import { ADD_VOCABULARY } from '../../../mutation/mutation';
import '../../../styles/vocabulary.styl'
function Dictionary(props) {
  console.log(props.def)
  return (
    <Fragment>
      <strong>{props.word}</strong>
      {
        props.def.map((stuff, key) => {
          return <p key={key}><strong>{stuff.fl}</strong> {stuff.shortdef}</p>
        })
      }
    </Fragment>
  )

}
function ListBucket(props) {
  //the individual words that are in the database
  const [removeVocab, { removed }] = useMutation(REMOVE_VOCABULARY);
  const [lookup, setLookup] = useState([])
  const [show, setShow] = useState(false)

  const [word, addWord] = useState(props)
  const removeWord = (e) => {
    const yesOrNo = confirm(`Do you want to delete the word: ${word.word.vocabulary_word}?`)
    if (yesOrNo == true) {
      removeVocab({ variables: { vocab_id: e.target.name } }).then((e) => {
        location.reload();
      })
    }
  }
  const dictionaryLookup = e => {
      setShow(true)
      console.dir(lookup)
  }
  const closeit = e => {
    e.preventDefault();
    setShow(false)
  }
  useEffect(() => {
    fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${word.word.vocabulary_word}?key=${process.env.REACT_APP_MERR}`)
    .then((res) => {
      return res.json()
    }).then( async (res) => {
      setLookup(res)
    })
  }, [show])

  return (
    <Fragment>
    <p onClick={dictionaryLookup} className={props.dupeWord === word.word.vocabulary_word || props.dupeWordt === word.word.vocabulary_word ? 'vocabulary duped': 'vocabulary'}>{word.word.vocabulary_word} 
    <button className="not-button" name={word.word.vocab_id} onClick={removeWord}>×</button></p>
    {show && 
    <div className="selected-definition" onClick={closeit}><Dictionary def={lookup} word={word.word.vocabulary_word}/></div>}
    </Fragment>)
}

export default function VocabBucket(props) {
  const [vocab, addVocabu] = useState(false);
  const [addVocab, { data }] = useMutation(ADD_VOCABULARY);
  const [dupeWord, setDupeWord] = useState('')

  const submitVocabulary = e => {
    e.preventDefault();
    //before adding the word manually, let's capitalize the first letter
    let formattedWord = vocab.charAt(0).toUpperCase() + vocab.slice(1)
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

  return (<div className="vocab-bucket">

    <form onSubmit={submitVocabulary}>
      <label htmlFor="vocab">Add Vocabulary Word</label>
      <input id="vocab" placeholder="new word" onChange={e => addVocabu(e.target.value)} />
      <button type="submit">submit word</button>
    </form>
    <div className="list-of-vocabularies">
      {props.vocab.map((wordt, key) => {
      return <ListBucket 
      dupeWordt={props.dupeWord} 
      dupeWord={dupeWord} 
      word={wordt} 
      key={key} 
      index={key} />
    })}
    </div>


  </div>

  )
}