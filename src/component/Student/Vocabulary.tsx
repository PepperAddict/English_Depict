import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { getVocabularyByID } from '../../query/query';
import { ADD_VOCABULARY } from '../../mutation/mutation';

function ShowDef(props) {
  let definitionArray = props.definition.split(' ')
  const handleMenu = (e) => {
    e.preventDefault();
    props.addVocabulary(e.target.innerHTML)
  }
  return (
    <p key={props.index}>{definitionArray.map((def, defindex) => {
      return <span className="blog-content" onClick={handleMenu} key={defindex} index={defindex} > {def} </span>
    })}</p>
  )
}

export default function Vocabulary(props) {
  const { loading, error, data } = useQuery(getVocabularyByID, {
    variables: { student_id: props.student_id }
  })


  const [addVocab] = useMutation(ADD_VOCABULARY);

  const closeIt = e => {
    e.preventDefault();
    //set vocabulary to false to disable vocabulary sidebar
    props.addVocabulary(false)
  }
  const submitVocabulary = e => {
    e.preventDefault();
    let def = props.definition[0];
    let isMatch = false;

    if (props.allVocab) {
      for (let x of props.allVocab) {
        if (x.vocabulary_word === props.vocab) {
          isMatch = true;
          break;
        }
      }
    }
    if (!isMatch) {
      addVocab({
        variables: {
          input: {
            student_id: props.student_id,
            vocabulary_word: props.vocab,
            vocabulary_definition: def
          }
        }
      }).then((e) => {
        props.showVocab(props.vocab)
      }).catch((err) => console.log(err))
    } else {
      console.log(props)
      props.dupeWord(props.vocab)
    }

  }

  return (
    <div className="vocab-def">
    <h2>Word Lookup: <strong>{props.vocab}</strong></h2>

      Definition: {props.definition ? props.definition.map((def, index) => {
        return <ShowDef
          key={'key' + index}
          index={index}
          addVocabulary={props.addVocabulary}
          definition={def} />
      }) : 'Not a word'}
      {props.definition ? <button name={props.vocab} className="is-button" onClick={submitVocabulary}>Add <strong>{props.vocab}</strong> to Vocabulary Bucket</button> : ''}

      <button className="not-button" onClick={closeIt}>close</button>

    </div>
  )
}