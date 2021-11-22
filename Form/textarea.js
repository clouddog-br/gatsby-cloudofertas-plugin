import React from 'react'

const TextArea = ({ field, register, errors }) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <textarea
        id={field.name}
        name={field.name}
        type='text'
        className={`${errors[field.name] ? 'error' : ''}`}
        {...register(field.name, { required: field.required, maxLength: field.length !== null && field.length })}
        rows="4" cols="50"
      />
    </>
  )
}

export default TextArea
