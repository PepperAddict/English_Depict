/*
This Task will use UnSplash API https://github.com/unsplash/unsplash-js
*/
import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Unsplash from 'unsplash-js';
const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS });

ListOfImages.propTypes = {
  images: PropTypes.object
}
function ListOfImages(props) {
  return (
    <img src={props.images.urls.thumb} alt={props.images.description} />
  )
}

Teacher_ImageClue_Task.propTypes = {
  teacher_data: PropTypes.object
};

export default function Teacher_ImageClue_Task(props) {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [counter, setCounter] = useState(2);
  const [totalPages, setTotalPages] = useState(false);
  const [error, setError] = useState(false);

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
  }
  const countMe = e => {
    let queryResult = [];
    setCounter(counter + 1);
    if (counter < totalPages) {
      unsplash.search.photos(query, counter, 10, { orientation: 'portrait' })
        .then(res => {
          return res.json();
        }).then((response) => {
          response.results.forEach(it => queryResult.push(it));
        }).then((ok) => {
          setResults(queryResult);
        })
        .catch((err) => console.log(err))
    }

  }



  return (
    <Fragment>
      <form onSubmit={searchImages}>
        <label htmlFor="search-image">Search Image Database</label>
        <input placeholder="Enter an image keyword" onChange={e => setQuery(e.target.value)} />
        <button type="submit">Search Images</button>
      </form>
      {
        results &&
        <Fragment>
          {
            results.map((searched, key) => {
              return <ListOfImages key={key} images={searched} />
            })}
            {totalPages > 1 && counter <= totalPages && <button type="button" onClick={countMe}>More</button>}
          {error === 1 && <div>No Images found for query: {query}</div>}
        </Fragment>
      }
    </Fragment>
  )
}