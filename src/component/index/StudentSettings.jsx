import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_STUDENT_AVATAR} from '../../mutation/mutation';

export default function StudentSettings(props) {

  const [updateAvatar, {avatarData}] = useMutation(UPDATE_STUDENT_AVATAR);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({})
  const [message, setMessage] = useState('')
  const [percent, setUploadPercentage] = useState('0')

  const imageChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  }
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
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
      }).then( (response) => {
        if (response.status === 200) {
          console.log(response.data)
          const { image, location } = response.data;

          updateAvatar({variables: {input: {student_id: props.student_id, avatar: location}}}).then((e) => {
            setUploadedFile({ image, location });
          })
        } else {
          setMessage(err.response.data.msg)
        }

      }).catch((err) => {
        if (err.response.status === 400) {
          setMessage(err.response.data.msg)
        } else {
          setMessage('There was a problem with the server')
        }
        
      })
    } else {
      setMessage('No image was uploaded. Please try again.')
    }


  }

  return (
    <div className="image-upload">
      {typeof message != 'undefined' ? message : ''}
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label htmlFor="image-upload">Choose an Image</label>
        <input name="depictImage" type="file" id="image-upload" onChange={imageChange} />
        <button type="submit" value="Upload" >Submit Avatar</button>
      </form>
      <div className="percent-bar" style={{width: percent + '%' }} >{percent}%</div>

        <div className="avatar">
          <img className="avatar-image" src={uploadedFile.location ? uploadedFile.location : props.avatar} />
        </div>
      
    </div>
  )
}