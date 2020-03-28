import React, { useState, useEffect, Fragment } from 'react';

export default function VocabTask(props) {
    const [vocabs, setvocabs] = useState(props.vocabs);
    return (
        <div> {
            vocabs.map((word, key) => {
                return <p key={key} index={word.vocab_id}>{word.vocabulary_word}</p>
            })}</div>
    )
}