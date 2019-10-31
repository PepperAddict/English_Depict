import React, { useState, useEffect } from 'react';

function ShowDef(props) {
  return (
    <span>{props.definition}</span>
  )
}

export default function Vocabulary(props) {

  return (
    <div className="studentVocabulary">Hello, you selected the word:
    <p>{props.vocab}</p>

    Definition: {props.definition ? props.definition.map((def, index) =>
      {
        return <ShowDef key={index} index={index} definition={def}/>
      }) : 'Not a word'}
    </div>
  )
}