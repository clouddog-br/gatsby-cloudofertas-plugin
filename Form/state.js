import React from 'react'

const State = ({ ufs, field, register, handleState, errors }) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <select
        id={field.name}
        name={field.name}
        {...register(field.name, { required: field.required, maxLength: field.length !== null && field.length })}
        onChange={(event) => handleState(event)}
        className={`${errors[field.name] ? 'error' : ''}`}
        defaultValue={''}
      >
         <option value='' disabled> Selecionar </option>
        {
          ufs.map(uf => {
            uf.concat = uf.sigla + ' - ' + uf.nome
            return (
              <option value={uf.sigla} key={uf.id}>
                {uf.concat}
              </option>
            )
          })
        }
      </select>
    </>
  )
}

export default State
