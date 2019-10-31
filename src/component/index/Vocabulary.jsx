import React, { useState, useEffect } from 'react';

function ShowDef(props) {
  let definitionArray = props.definition.split(' ')
  const handleMenu = (e) => {
    e.preventDefault();
    props.addVocabulary(e.target.innerHTML)
  }
  return (
    <p>{definitionArray.map((def, index) => {
      return <span className="blog-content" onClick={handleMenu} key={index} index={index} > {def} </span>
    })}</p>
  )
}

export default function Vocabulary(props) {
  const closeIt = e => {
    e.preventDefault();
    props.addVocabulary(false)
  }
  const submitVocabulary = e => {
    e.preventDefault();
  }

  return (
    <div className="studentVocabulary">Hello, you selected the word:
    <p>{props.vocab}</p>

    Definition: {props.definition ? props.definition.map((def, index) =>
      {
        return ( <div>
        <ShowDef 
        key={index} 
        index={index} 
        addVocabulary={props.addVocabulary} 
        definition={def}/>
        </div>
        )
      }) : 'Not a word'}
      {props.definition ? <button name={props.vocab} onClick={submitVocabulary}>Add {props.vocab} to Vocabulary bucket</button> : ''}
      

      <button onClick={closeIt}>Close</button>
    </div>
  )
}