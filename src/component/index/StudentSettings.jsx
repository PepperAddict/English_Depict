import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

export default function StudentSettings(props) {

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({})
  const [message, setMessage] = useState('')
  const [percent, setUploadPercentage] = useState('0')

  const imageChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  }
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('depictImage', file, filename);

    axios.post('/upload', formData, {
      headers: {
        'accept': 'application/json'
      },
      onUploadProgress: progressEvent => {
        setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
        // clear percentage
        setTimeout(() => setUploadPercentage(0), 10000)
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        const { image, location } = response.data;
        setUploadedFile({ image, location });
      }

    }).catch((err) => {
      console.log(err)
    })




    // if (err.response.status === 500) {
    //   setMessage('There was a problem with the server')
    // } else {
    //   setMessage(err.response.data.msg)
    // }

  }

  return (
    <Fragment>
      {typeof message != 'undefined' ? message : ''}
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label htmlFor="image-upload">Choose a File</label>
        <input name="depictImage" type="file" id="image-upload" onChange={imageChange} />
        <button type="submit" value="Upload" >Submit Avatar</button>
      </form>
      {uploadedFile && 
      <div>
        <img src={uploadedFile.location} />

      </div>
      }

    </Fragment>
  )
}