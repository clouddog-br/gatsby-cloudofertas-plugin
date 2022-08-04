import React from 'react'

const Email = ({ field, register, errors, placeholder, errorLabel }) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      {errorLabel === 'top' && <small>{errors[field.name] && 'Campo obrigatatório'}</small>}
      <input
        id={field.name}
        name={field.name}
        type='email'
        placeholder={placeholder && `${field.label}`}
        className={`${errors[field.name] ? 'error' : ''}`}
        {...register(field.name, {
          required: {
            value: field.required,
            message: 'Campo obrigatório'
          },
          maxLength: field.length !== null && field.length,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email Inválido'
          }
        })}
      />
    </>
  )
}

export default Email
