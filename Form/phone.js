import React from 'react'
import InputMask from 'react-input-mask'

const Phone = ({ field, register, errors }) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      {errorLabel = 'top' && <small>{errors[field.name] && 'Campo obrigatatório'}</small>}
      <InputMask
        mask={'(99) 9999-99999'}
        maskChar={null}
        id={field.name}
        name={field.name}
        type='text'
        className={`${errors[field.name] ? 'error' : ''}`}
        {...register(field.name, { required: field.required, maxLength: field.length !== null && field.length })}
      />
    </>
  )
}

export default Phone
