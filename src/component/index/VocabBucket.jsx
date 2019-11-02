import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { getVocabularyByID } from '../../query/query';
import { ADD_VOCABULARY } from '../../mutation/mutation';

function ListBucket(props) {
  return (
    <p>{props.word.vocabulary_word}</p>
  )
}

export default function VocabBucket(props) {
  const { loading, error, data } = useQuery(getVocabularyByID, {
    variables: { student_id: 13 }
  })



  return (<div className="vocab-bucket">
    {data ? (
      <span>{data.getVocabulary.map((word, key) => {
        return < ListBucket word={word} key={key} index={key} />
      })}</span>
    ) : 'No Vocabulary in bucket'}
  </div>

  )
}