import React, { useState } from 'react';
import { ADD_COMMENT } from '../../mutation/mutation';
import { useMutation } from '@apollo/react-hooks';

interface AddCommentProps {
  blog_id: number, 
  teacher_id: number
}

export default function AddComment(props: AddCommentProps) {
  const [addComment] = useMutation(ADD_COMMENT);
  const [content, setContent] = useState('');
  const submit = e => {
    e.preventDefault();
    const commentInfo = {
      blog_id: props.blog_id,
      student_id: null,
      teacher_id: props.teacher_id,
      content: content
    };
    addComment({ variables: { input: commentInfo } }).then(() => {
      location.reload();
    }).then((err) => {
      console.log(err);
    });
  };
  return (
    <form onSubmit={submit}>
      <label htmlFor="add-comment">Add Comment</label>
      <textarea id="add-comment" onChange={e => setContent(e.target.value)} />
      <button type="submit">submit comment</button>
    </form>);
}