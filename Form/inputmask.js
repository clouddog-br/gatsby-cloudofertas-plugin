import React from 'react'
import InputMask from 'react-input-mask'

const Mask = ({ field, register, errors, placeholder, errorLabel }) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      {errorLabel === 'top' && <small>{errors[field.name] && 'Campo obrigatatório'}</small>}
      <InputMask
        mask={field.mask}
        maskChar={null}
        id={field.name}
        name={field.name}
        placeholder={placeholder && `${field.label}`}
        type='text'
        className={`${errors[field.name] ? 'error' : ''}`}
        {...register(field.name, { required: field.required, maxLength: field.mask.length })}
      />
    </>
  )
}

export default Mask
