import React, { useState, useEffect, Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_VOCABULARY } from '../../mutation/mutation';
import { ADD_VOCABULARY } from '../../mutation/mutation';
import '../../styles/vocabulary.styl'
function EachWord(props) {
  let defArray = props.def.split(' ')
  const addWord = e => {
    props.addVocabulary(e.target.innerHTML)
  }
  return (
    <p>
      {defArray.map((indi, key) => {
        return <span key={key} name={indi} onClick={addWord}>{indi}</span>
      })}
    </p>
  )
}

function Dictionary(props) {
  return (
    <Fragment>
      <strong>{props.word}</strong>
      {
        props.def.map((stuff, key) => {
          return <div className="definition" key={key}><strong>{stuff.fl}</strong> {stuff.shortdef.map((more, key2) =>{
            return <EachWord key={key2} def={more} index={key2} addVocabulary={props.addVocabulary}/>
          })}</div>
        })
      }
    </Fragment>
  )

}
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
  const dictionaryLookup = e => {
    props.sendDef(e.target.innerHTML);
    // props.closeit();
  }


  return (
    <div className="section-word">
      <p onClick={dictionaryLookup} className={props.dupeWord === word.word.vocabulary_word || props.dupeWordt === word.word.vocabulary_word ? 'vocabulary duped' : 'vocabulary'}>{word.word.vocabulary_word}</p>
      <button className="not-button" name={word.word.vocab_id} onClick={removeWord}>×</button>
    </div>)
}

export default function VocabBucket(props) {
  const [vocab, addVocabu] = useState(false);
  const [addVocab, { data }] = useMutation(ADD_VOCABULARY);
  const [dupeWord, setDupeWord] = useState('')
  const [showDict, setShowDict] = useState([])
  const [show, setShow] = useState(false)
  const [selectedword, setselectedword] = useState(null)

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
  const childDef = async e => {
    setselectedword(e)
    if (!show) {
      setShow(true)
    } 
  }
  const closeit = e => {
    if (show) {
      setShow(false)
    } else {
      setShow(true)
    }
  }
  useEffect(() => {
      fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${selectedword}?key=${process.env.REACT_APP_MERR}`)
        .then((res) => {
          return res.json()
        }).then((res) => {
          setShowDict(res)
        })
    
  }, [selectedword])

  return (<div className="vocab-bucket">

    <form onSubmit={submitVocabulary}>
      <label htmlFor="vocab"><h2>Vocabulary Bucket</h2></label>
      <input id="vocab" placeholder="Add Word to Bucket" onChange={e => addVocabu(e.target.value)} />
      <button type="submit" className="submit-word">submit {vocab ? vocab : 'word'}</button>
    </form>

    <h3>Vocabularies</h3>
    <div className="list-of-vocabularies">

      {props.vocab.map((wordt, key) => {
        return <ListBucket
          dupeWordt={props.dupeWord}
          dupeWord={dupeWord}
          word={wordt}
          key={key}
          index={key}
          sendDef={childDef} 
          closeit={closeit}/>
      })}
      {show &&
        <div className="selected-definition">
          <div className="x-close" onClick={closeit}>close</div>
          <Dictionary def={showDict} addVocabulary={props.addVocabulary} word={selectedword}/></div>}

    </div>


  </div>

  )
}