import React from 'react'
import InputMask from 'react-input-mask'

const Phone = ({ field, register, errors, placeholder, errorLabel }) => {
  const beforeMaskedValueChange = (newState) => {
    let { value } = newState

    const newValue = value.replace(/\D/g, '')
    if (newValue.length === 11) {
      value = newValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
    }

    return {
      ...newState,
      value
    }
  }

  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      {errorLabel === 'top' && <small>{errors[field.name] && 'Campo obrigatatório'}</small>}
      <InputMask
        mask={'(99) 9999-99999'}
        maskChar={null}
        id={field.name}
        name={field.name}
        placeholder={placeholder && `${field.label}`}
        type='text'
        className={`${errors[field.name] ? 'error' : ''}`}
        {...register(field.name, { required: field.required, maxLength: field.length !== null && field.length })}
        beforeMaskedValueChange={beforeMaskedValueChange}
      />
    </>
  )
}

export default Phone
