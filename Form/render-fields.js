import React, { useState, useEffect } from 'react'

/* COMPONENTS */
import Field from './input'
import Select from './select'
import State from './state'
import City from './city'
import Phone from './phone'
import TextArea from './textarea'
import Checkbox from './checkbox'
import Upload from './upload'
import Mask from './inputmask'
import Terms from './terms'

const RenderFields = ({
  formFields,
  inputStyle,
  inputSearchStyle,
  modalStyle,
  modalCheckBoxStyle,
  placeholder,
  errorLabel,
  register,
  getValues,
  setValue,
  errors,
  setDisabledBtn
}) => {
  const [ufs, setUfs] = useState([])
  const [districts, setDistricts] = useState([])

  const sortValues = (object, field) => (object.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0)))

  if (process.env.IBGE !== undefined) {
    useEffect(() => {
      async function getEstados () {
        await fetch(`${process.env.IBGE}/estados`)
          .then(res => res.json())
          .then(res => setUfs(sortValues(res, 'sigla')))
      }
      getEstados()
    }, [])
  }

  const handleStateSelected = (event) => {
    const index = ufs.findIndex(value => value.sigla === event.target.value)
    const state = ufs[index]
    fetch(`${process.env.IBGE}/estados/${state.id}/municipios`)
      .then(res => res.json())
      .then(res => setDistricts(sortValues(res, 'nome')))
  }

  return (
    <>
      {
        formFields.map((field, index) => {
          switch (field.type) {
            case 'select':
              return (
              <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                <Select
                  field={field}
                  list={field.formLov.formLovData}
                  register={register}
                  errors={errors}
                />
                {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
            case 'state':
              return (
              <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                <State
                  ufs={ufs}
                  field={field}
                  register={register}
                  handleState={handleStateSelected}
                  errors={errors}
                />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
            case 'city':
              return (
              <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                <City
                  districts={districts}
                  field={field}s
                  register={register}
                  errors={errors}
                />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
            case 'phone':
              return (
              <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                <Phone
                  field={field}
                  register={register}
                  errors={errors}
                  placeholder={placeholder}
                  errorLabel={errorLabel}
                />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
            case 'textarea':
              return (
              <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                <TextArea
                  field={field}
                  register={register}
                  errors={errors}
                  placeholder={placeholder}
                />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
            case 'checkbox':
              return (
              <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                <Checkbox
                  field={field}
                  register={register}
                  errors={errors}
                  placeholder={placeholder}
                  errorLabel={errorLabel}
                />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
            case 'inputmask':
              return (
              <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                <Mask
                  field={field}
                  register={register}
                  errors={errors}
                  placeholder={placeholder}
                />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
            case 'upload':
              return (
              <div key={`${field.id}-${index}`} className={`${inputSearchStyle} ${field.style}`}>
                <Upload
                  field={field}
                  register={register}
                  errors={errors}
                  errorLabel={errorLabel}
                  setValue={setValue}
                  setDisabledBtn={setDisabledBtn}
                />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
            case 'terms':
              return (
              <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                <Terms
                  field={field}
                  register={register}
                  errors={errors}
                  placeholder={placeholder}
                  getValues={getValues}
                  setValue={setValue}
                  errorLabel={errorLabel}
                  modalStyle={modalStyle}
                  modalCheckBoxStyle={modalCheckBoxStyle}
                />
                {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
            case 'input':
            default:
              return (
              <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                <Field
                  field={field}
                  register={register}
                  errors={errors}
                  placeholder={placeholder}
                  errorLabel={errorLabel}
                />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatatório</small>}
              </div>
              )
          }
        })
      }
    </>
  )
}

export default RenderFields
