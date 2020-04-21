import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_STUDENT_AVATAR, UPDATE_STUDENT_NAME } from '../../mutation/mutation';


function ChangeName(props) {
  const [updateName] = useMutation(UPDATE_STUDENT_NAME);
  const [newName, setnewName] = useState('')
  const onSubmit = e => {
    e.preventDefault();
    updateName({ variables: { input: { student_id: props.student_id, name: newName } } }).then((e) => {
      props.setName(newName)
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="image-upload">Change name</label>
      <input placeholder="name" onChange={e => { setnewName(e.target.value) }} />
      <button type="submit" value="Upload" >Submit Name</button>
    </form>)
}

export default function StudentSettings(props) {

  const [updateAvatar] = useMutation(UPDATE_STUDENT_AVATAR);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({})
  const [message, setMessage] = useState('')
  const [percent, setUploadPercentage] = useState('0');
  const [name, setName] = useState(props.name)

  const imageChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  }
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    let sendOld = props.avatar ? props.avatar : filename;


    if (file) {
      formData.append('depictImage', file, filename);

      axios.post('/upload', formData, {
        headers: {
          'accept': 'application/json',
          'oldImage': (props.avatar) ? props.avatar : null,
          'username': props.username
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          // clear percentage
          setTimeout(() => setUploadPercentage(0), 10000)
        }
      }).then((response) => {
        if (response.status === 200) {
          const { image, location } = response.data;

          updateAvatar({ variables: { input: { student_id: props.student_id, avatar: location } } }).then((e) => {
            setUploadedFile({ image, location });
          })
          
        } else {
          setMessage(response.data.msg)
        }
      }).then(() => {
        location.reload();
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
      <h1>Hello {name}</h1>
      {typeof message != 'undefined' ? message : ''}
      <div className="avatar">
        <img className="avatar-image" src={uploadedFile.location ? uploadedFile.location : props.avatar} />
      </div>

      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label htmlFor="image-upload">Choose an Image</label>
        <input name="depictImage" type="file" id="image-upload" onChange={imageChange} />
        <button type="submit" value="Upload" >Submit Avatar</button>
      </form>
      <div className="percent-bar" style={{ width: percent + '%' }} >{percent}%</div>
      <hr></hr>
      <ChangeName student_id={props.student_id} name={name} setName={setName} />
    </div>
  )
}