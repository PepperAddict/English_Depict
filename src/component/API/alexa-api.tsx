import React, { useState, Fragment } from 'react';

import moment from 'moment';
import { alexaGET } from '../../query/query';
import { useMutation, useQuery } from '@apollo/react-hooks';
const url = window.location.href


export default function WOTD(props) {
    const [word, setWord] = useState(null);
    const [sentence, setSentence] = useState(null);
    const last = url.split('/')
    const email = last[last.length - 1];
    const [stringjson, setstringjson] = useState(null);
    const { loading, error, data } = useQuery(alexaGET, { variables: { email: email } });
    if (data) {
        let oby = {}


        for (let student of data.getUserByEmail.students) {
            oby[student.identifier] = {
                name: student.name,
                tasks: student.tasks
            }
        }
        setstringjson(JSON.stringify(oby))

    }

    const isEmail = email.indexOf("@") > 0


    return (
        <Fragment>
            {(isEmail && stringjson) ? <span>{stringjson}</span> : <span>Nothing to see here</span>}
        </Fragment>
    )
}