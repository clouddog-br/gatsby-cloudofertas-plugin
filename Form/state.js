import React from 'react'

const State = ({ ufs, field, register, handleState, errors }) => {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <select
        id={field.name}
        name={field.name}
        {...register(field.name, {
          onChange: (e) => { handleState(e.target.value) },
          required: field.required,
          maxLength: field.length !== null && field.length
        })}
        className={`${errors[field.name] ? 'error' : ''}`}
        defaultValue={''}
      >
        <option value='' disabled> Selecione um Estado </option>
        {
          ufs.map(uf => {
            uf.concat = uf.sigla + ' - ' + uf.nome
            return (
              <option value={uf.sigla} key={uf.sigla}>
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
