import React from 'react'
const Checkbox = ({ field, register, errors, errorLabel }) => {
  return (
    <>
   {errorLabel === 'top' && <small>{errors[field.name] && 'Campo obrigatatório'}</small>}
    <div>
      <input
        id={field.name}
        name={field.name}
        type="checkbox"
        {...register(field.name, { required: field.required })}
        />
        <label htmlFor={field.name} className={`${errors[field.name] ? 'error' : ''}`}>{field.label}</label>
    </div>
    </>
  )
}

export default Checkbox
