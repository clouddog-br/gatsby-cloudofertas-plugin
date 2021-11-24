import React from 'react'
import parse from 'html-react-parser';
const Checkbox = ({ field, register, errors, errorLabel }) => {
  return (
    <>
    {errorLabel = 'top' && <small>{errors[field.name] && 'Campo obrigatatório'}</small>}
    <div className="form-group form-check">
      <input 
        id={field.name}
        name={field.name}
        type="checkbox"
        className={`${errors[field.name] ? 'error' : ''}`}
        {...register(field.name, { required: field.required })}
        />
        <label htmlFor={field.name} className="form-check-label">{parse(field.label)}</label>
    </div>
    </>
  )
}

export default Checkbox
