import React from 'react'

interface CommentProps {
    comment: {
        content: string;
        author: string;
        income: string;
        age: string;
    }
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div className='text-light'>
        <div>{comment.content}</div>
        <div className='mt-4'>{comment.author} | {comment.income} | {comment.age}</div>
    </div>
  )
}

export default Comment