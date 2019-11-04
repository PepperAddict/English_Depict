import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { ADD_VOCABULARY } from '../../mutation/mutation';

function ListBucket(props) {
  const [word, addWord] = useState(props)
  return (
    <p>{word.word.vocabulary_word}</p>
  )
}

export default function VocabBucket(props) {
  const [vocab, addVocabu] = useState(false);
  const [addVocab, {data}] = useMutation(ADD_VOCABULARY)

  const submitVocabulary = e => {
    e.preventDefault();
    addVocab({variables: {input: {
      student_id: props.student_id, 
      vocabulary_word: vocab,
    }
  }}).then((e) => {
    props.showVocab(vocab)
  }).catch((err) =>console.log(err))
    
  }

  return (<div className="vocab-bucket">

    <form onSubmit={submitVocabulary}>
      <label htmlFor="vocab">Add Vocabulary Word</label>
      <input id="vocab" placeholder="new word" onChange={e => addVocabu(e.target.value)}/>
      <button type="submit">submit word</button>
    </form>

      { props.vocab.map((wordt, key) => {
          return <ListBucket word={wordt} key={key} index={key} />
        }) }



  </div>

  )
}