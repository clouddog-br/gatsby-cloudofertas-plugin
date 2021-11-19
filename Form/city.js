import React from 'react'

const City = ({ districts, field, register, errors }) => {
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
        <option value='' disabled> Selecionar </option>
        {
          districts.map(district => {
            return (
              <option value={district.nome} key={district.id}>
                {district.nome}
              </option>
            )
          })
        }
      </select>
    </>
  )
}

export default City
