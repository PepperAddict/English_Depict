import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { getVocabularyByID } from '../../query/query';
import { ADD_VOCABULARY } from '../../mutation/mutation';

function ListBucket(props) {
  const [word, addWord] = useState(props)
  return (
    <p>{word.word}</p>
  )
}

export default function VocabBucket(props) {
  const { loading, error, data } = useQuery(getVocabularyByID, {
    variables: { student_id: props.student_id }
  })
  const [word, addWord] = useState({
    vocab: []
  })
  let vocabt = [];
  if (data) {
    for (let x of data.getVocabulary) {
      vocabt.push(x.vocabulary_word);
    }
    word.vocab = vocabt;
  }


  return (<div className="vocab-bucket">

      { data ? word.vocab.map((wordt, key) => {
          return <ListBucket word={wordt} key={key} index={key} />
        }) : ('')}
  </div>

  )
}