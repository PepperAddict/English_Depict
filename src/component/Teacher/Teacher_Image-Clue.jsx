/*
This Task will use UnSplash API https://github.com/unsplash/unsplash-js
*/
import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Unsplash from 'unsplash-js';
import '../../styles/tasks.styl';
const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS });
import NextStage from './Teacher_Image-Clue-Two.jsx';


ListOfImages.propTypes = {
  images: PropTypes.object,
  setNext: PropTypes.func
};
function ListOfImages(props) {
  const [imageInfo] = useState(props.images);
  const imageClick = e => {
    e.preventDefault();
    props.setNext(imageInfo);
  };
  return (
    <div className="images-selection" >
      <img src={props.images.urls.thumb} alt={props.images.alt_description} />
      <button type="button" onClick={imageClick} >Choose {props.images.alt_description ? props.images.alt_description + '?' : 'this image?'}</button>
    </div>
  );
}

Teacher_ImageClue_Task.propTypes = {
  teacher_data: PropTypes.object,
  students: PropTypes.array
};

export default function Teacher_ImageClue_Task(props) {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [counter, setCounter] = useState(2);
  const [totalPages, setTotalPages] = useState(false);
  const [error, setError] = useState(false);
  const [next, setNext] = useState(false);

  const searchImages = e => {
    let queryResult = [];
    e.preventDefault();
    unsplash.search.photos(query, 1, 10, { orientation: 'portrait' })
      .then(res => {
        return res.json();
      }).then((response) => {
        if (response.total === 0) setError(1);
        setTotalPages(response.total_pages);
        response.results.forEach(it => queryResult.push(it));
      }).then(() => {
        setResults(queryResult);
      })
      .catch((err) => console.log(err));
  };
  const countMe = () => {
    let queryResult = [];
    setCounter(counter + 1);
    if (counter < totalPages) {
      unsplash.search.photos(query, counter, 10, { orientation: 'portrait' })
        .then(res => {
          return res.json();
        }).then((response) => {
          response.results.forEach(it => queryResult.push(it));
        }).then(() => {
          setResults(queryResult);
        })
        .catch((err) => console.log(err));
    }

  };



  return (
    <Fragment>
      {!next ? (
        <Fragment>
          <form onSubmit={searchImages}>
            <label htmlFor="search-image">Search Image Database</label>
            <input placeholder="Enter an image keyword" onChange={e => setQuery(e.target.value)} />
            <button type="submit">Search Images</button>
          </form>
          {results &&
            <Fragment>
              {
                results.map((searched, key) => {
                  return <ListOfImages key={key} images={searched} setNext={setNext}/>;
                })}
              {totalPages > 1 && counter <= totalPages && <button type="button" onClick={countMe}>More</button>}
              {error === 1 && <div>No Images found for query: {query}</div>}
            </Fragment>
          }
        </Fragment>
      ) :
        <NextStage image_data={next} setNext={setNext} students={props.students} teacher_id={parseInt(props.teacher_data.id)}/>}

    </Fragment>
  );
}