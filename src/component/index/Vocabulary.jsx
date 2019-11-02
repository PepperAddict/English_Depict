import React, { useState, useEffect } from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {getVocabularyByID} from '../../query/query';
import {ADD_VOCABULARY} from '../../mutation/mutation';

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
  const {loading, error, data} = useQuery(getVocabularyByID, {
    variables: {student_id: props.student_id}
  })


  const [addVocab, {vocabulary}] = useMutation(ADD_VOCABULARY);

  const closeIt = e => {
    e.preventDefault();
    //set vocabulary to false to disable vocabulary sidebar
    props.addVocabulary(false)
  }
  const submitVocabulary = e => {
    e.preventDefault();
    let def = props.definition[0];

    addVocab({variables: {input: {
      student_id: props.student_id, 
      vocabulary_word: props.vocab,
      vocabulary_definition: def
    }}}).then((e) => {
      console.log(e)
    }).catch((err) =>console.log(err))
  }

  return (
    <div className="vocab-def">You selected the word:
    <h3>{props.vocab}</h3>

    Definition: {props.definition ? props.definition.map((def, index) =>
      {
        return <ShowDef 
        key={'key' + index} 
        index={index} 
        addVocabulary={props.addVocabulary} 
        definition={def}/>
      }) : 'Not a word'}
      {props.definition ? <button name={props.vocab} onClick={submitVocabulary}>Add {props.vocab} to Vocabulary bucket</button> : ''}
      
      <button onClick={closeIt}>Close</button>

    </div>
  )
}