import React from 'react'

const Field = ({ field, register, errors, placeholder, errorLabel, label}) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      {errorLabel = 'top' && <small>{errors[field.name] && 'Campo obrigatatório'}</small>}
      <input
        id={field.name}
        name={field.name}
        type='text'
        placeholder={placeholder && `${field.label}`}
        className={`${errors[field.name] ? 'error' : ''}`}
        {...register(field.name, { required: field.required, maxLength: field.length !== null && field.length })}
      />
    </>
  )
}

export default Field
