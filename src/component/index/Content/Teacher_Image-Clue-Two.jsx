/*
Part of Teacher_Image-Clue. This is next step to write to 
database. 
*/

import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

NextStage.propTypes = {
  image_data: PropTypes.object,
  setNext: PropTypes.func
};

export default function NextStage(props) {
  const goBack = () => {
    props.setNext(false);
  };
  const selectedImage = e => {
    e.preventDefault();
    const select = document.getElementById('select-date');
    console.log(select.options[select.selectedIndex].value)
  }

  return (<div className="image-clue-container">
    <h1>Image Clue</h1>
    <h2>You are selecting: {props.image_data.alt_description}</h2>
    <img src={props.image_data.urls.small} alt={props.image_data.alt_description} />
    <form onSubmit={selectedImage}>
      <label htmlFor="select-date">Select Image for which date:</label>
      <select id="select-date">
        <option value={moment().format('L')}>{moment().format('MMMM Do')}</option>
        <option value={moment().add('1', 'days').format('L')}>{moment().add('1', 'days').format('MMMM Do')}</option>
        <option value={moment().add('2', 'days').format('L')}>{moment().add('2', 'days').format('MMMM Do')}</option>
        <option value={moment().add('3', 'days').format('L')}>{moment().add('3', 'days').format('MMMM Do')}</option>
        <option value={moment().add('4', 'days').format('L')}>{moment().add('4', 'days').format('MMMM Do')}</option>
        <option value={moment().add('5', 'days').format('L')}>{moment().add('5', 'days').format('MMMM Do')}</option>
      </select>
      <button type="submit">Submit Image for Image Clue</button>
    </form>

    <button type="button" onClick={goBack}>Choose a different Image</button>
  </div>)
}