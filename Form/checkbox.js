import React from 'react'

const Checkbox = ({ field, register, errors, errorLabel }) => {
  return (
    <div className="form-group form-check">
      {errorLabel = 'top' && <small>{errors[field.name] && 'Campo obrigatatório'}</small>}
      <input 
        id={field.name}
        name={field.name}
        type="checkbox"
        className={`${errors[field.name] ? 'error' : ''}`}
        {...register(field.name, { required: field.required })}
        />
        <label htmlFor="acceptTerms" className="form-check-label">{field.label}</label>
    </div>
  )
}

export default Field
