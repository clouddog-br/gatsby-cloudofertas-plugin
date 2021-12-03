import React from 'react'

const Select = ({ field, list, register, errors }) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <select
        id={field.name}
        name={field.name}
        {...register(field.name, { required: field.required, maxLength: field.length !== null && field.length })}
        className={`${errors[field.name] ? 'error' : ''}`}
        defaultValue={''}
      >
        <option value='' disabled> { field.label } </option>
        {list.map((item, index) => {
          return (
            <option key={`${field.name}-option-${index}`}>{item.value}</option>
          )
        })}
      </select>
    </>
  )
}

export default Select
