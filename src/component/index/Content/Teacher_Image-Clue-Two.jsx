/*
Part of Teacher_Image-Clue. This is next step to write to 
database. 
*/

import React, { useState, Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {ADD_TASK} from '../../../mutation/mutation';
import {useMutation} from '@apollo/react-hooks';

NextStage.propTypes = {
  image_data: PropTypes.object,
  setNext: PropTypes.func,
  students: PropTypes.array,
  teacher_id: PropTypes.number
};

export default function NextStage(props) {
  const [students] = useState(props.students);
  //error 0 is for empty student 
  const [error, setError] = useState(null);
  let sel = useRef(null);
  const [checked, setChecked] = useState(null);
  const [addTask] = useMutation(ADD_TASK);
  const goBack = () => {
    props.setNext(false);
  };
  const selectedImage = e => {
    e.preventDefault();
    let selectStudent = (checked) && Object.entries(checked).map((entry, key) => {
      if (entry[1] === true) {
        return entry[0];
      }
    });

    if (!selectStudent) setError(1);
    else {
      //if there is an error clear it
      setError(null);
      //remove the empty "undefined" from array for cleanup
      selectStudent = selectStudent.filter((item) => !(item === undefined));
      let chosenDate = sel.current.value;
      if (selectStudent.length === 0) {
        setError(1)
      } else {
        setError(null);
        selectStudent.forEach(kid => {
          let taskObject = {
            task_code: 'CIC', //Code is for Caption Image Clue 
            task_date: chosenDate, //To be able select a certain date
            student_id: parseInt(kid),
            teacher_id: props.teacher_id,
            entry: {
              clue_image: {
                alt_description: props.image_data.alt_description,
                urls: props.image_data.urls,
                creator: props.image_data.user,
                image_id: props.image_data.id
              }
            }
          };
          addTask({variables: {input: taskObject}}).then((res) => {
            console.log(res)
          }).catch((err) => console.log(err))
        });

      }

    }
  };

  const handleInputChange = e => {
    setChecked({
      ...checked, [e.target.name]: e.target.checked
    });

  }


  return (
    <Fragment>
      {students && (
        <div className="image-clue-container">
          <h1>Image Clue</h1>
          <h2>You are selecting: {props.image_data.alt_description}</h2>
          <div className="image-clue-choose">
            {error && error === 1 && <p>You did not select a student</p>}
            <img src={props.image_data.urls.small} alt={props.image_data.alt_description} />
            <form onSubmit={selectedImage}>
              <label htmlFor="select-date">Select Image for which date:</label>
              <select id="select-date" defaultValue={moment().format('L')} ref={sel}>
                <option value={moment().format('L')}>{moment().format('MMMM Do')}</option>
                <option value={moment().add('1', 'days').format('L')}>{moment().add('1', 'days').format('MMMM Do')}</option>
                <option value={moment().add('2', 'days').format('L')}>{moment().add('2', 'days').format('MMMM Do')}</option>
                <option value={moment().add('3', 'days').format('L')}>{moment().add('3', 'days').format('MMMM Do')}</option>
                <option value={moment().add('4', 'days').format('L')}>{moment().add('4', 'days').format('MMMM Do')}</option>
                <option value={moment().add('5', 'days').format('L')}>{moment().add('5', 'days').format('MMMM Do')}</option>
              </select>
              <h2>Choose for which student</h2>
              {students.map((student, key) => {
                return (<Fragment key={key}>
                  <label htmlFor={student.student_id}>{student.name}</label>
                  <input id={student.student_id} type="checkbox" name={student.student_id} onChange={handleInputChange} />
                </Fragment>)
              })}
              <button type="submit">Submit Image for Image Clue</button>
              <button type="button" onClick={goBack}>Choose a different Image</button>
            </form>
          </div>

        </div>
      )}
    </Fragment>)
}