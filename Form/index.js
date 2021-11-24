/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

/* COMPONENTS */
import Field from './input'
import Select from './select'
import State from './state'
import City from './city'
import Phone from './phone'
import TextArea from './textarea'
import Checkbox from './checkbox'

const RenderForm = ({ onSubmit, formData, formStyle, inputStyle, btnName, btnContainerStyle, btnStyle, placeholder, errorLabel }) => {
  const { handleSubmit, register, clearErrors, formState: { errors } } = useForm()

  const [ufs, setUfs] = useState([])
  const [districts, setDistricts] = useState([])

  const sortValues = (object, field) => (object.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0)))

  useEffect(() => {
    async function getEstados() {
      await fetch(`${process.env.IBGE}/estados`)
      .then(res => res.json())
      .then(res => setUfs(sortValues(res, 'sigla')))
    }
    getEstados()
  }, [])

  const handleStateSelected = (event) => {
    clearErrors('estado')
    const index = ufs.findIndex(value => value.sigla === event.target.value)
    const state = ufs[index]
    fetch(`${process.env.IBGE}/estados/${state.id}/municipios`)
      .then(res => res.json())
      .then(res => setDistricts(sortValues(res, 'nome')))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`container ${formStyle}`}>
      <div className='row'>
        <h2>{formData.label}</h2>
        {formData.map((field, index) => {
          switch (field.type) {
            case 'select':
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style} mt-4`}>
                  <Select
                    field={field}
                    list={field.formLov.formLovData}
                    register={register}
                    errors={errors}
                  />
                </div>
              )
            case 'state':
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style} mt-4`}>
                  <State
                    ufs={ufs}
                    field={field}
                    register={register}
                    handleState={handleStateSelected}
                    errors={errors}
                  />
                </div>
              )
            case 'city':
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style} mt-4`}>
                  <City
                    districts={districts}
                    field={field}s
                    register={register}
                    errors={errors}
                  />
                </div>
              )
            case 'phone':
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style} mt-4`}>
                  <Phone
                    field={field}
                    register={register}
                    errors={errors}
                    placeholder={placeholder}
                    errorLabel={errorLabel}
                  />
                </div>
              )
            case 'textarea':
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style} mt-4`}>
                  <TextArea
                    field={field}
                    register={register}
                    errors={errors}
                  />
                </div>
              )
            case 'checkbox':
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style} mt-4`}>
                  <Checkbox
                    field={field}
                    register={register}
                    errors={errors}
                    placeholder={placeholder}
                    errorLabel={errorLabel}
                  />
                </div>
              )
            case 'input':
            default:
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style} mt-4`}>
                  <Field
                    field={field}
                    register={register}
                    errors={errors}
                    placeholder={placeholder}
                    errorLabel={errorLabel}
                  />
                </div>
              )
          }
        })}
        <div className={btnContainerStyle}>
          <button type='submit' className={btnStyle}>
            {btnName}
          </button>
        </div>
      </div>
    </form>
  )
}

export default RenderForm
