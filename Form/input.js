import React from 'react'

const Field = ({ field, register, errors }) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <input
        id={field.name}
        name={field.name}
        type='text'
        className={`${errors[field.name] ? 'error' : ''}`}
        {...register(field.name, { required: field.required, maxLength: field.length !== null && field.length })}
      />
    </>
  )
}

export default Field
