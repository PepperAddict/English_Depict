import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ADD_COMMENT } from '../../../mutation/mutation';
import { useMutation } from '@apollo/react-hooks';


AddComment.propTypes = {
  blog_id: PropTypes.number,
  teacher_id: PropTypes.number
};

export default function AddComment(props) {
  const [addComment] = useMutation(ADD_COMMENT);
  const [content, setContent] = useState('');
  const submit = e => {
    e.preventDefault();
    const commentInfo = {
      blog_id: props.blog_id,
      student_id: null,
      teacher_id: parseInt(props.teacher_id),
      content: content
    };
    // addComment({ variables: { input: commentInfo } }).then(() => {
    //   location.reload();
    // }).then((err) => {
    //   console.log(err);
    // });
    console.log(content);

  };
  return (
    <form onSubmit={submit}>
      <label htmlFor="add-comment">Add Comment</label>
      <textarea id="add-comment" onChange={e => setContent(e.target.value)} />
      <button type="submit">submit comment</button>
    </form>);
}