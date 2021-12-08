/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

/* COMPONENTS */
import Field from './input'
import Select from './select'
import State from './state'
import City from './city'
import Phone from './phone'
import TextArea from './textarea'
import Checkbox from './checkbox'
import Upload from './upload'

const RenderForm = ({
  onSubmit,
  formData,
  containerStyle,
  rowStyle,
  inputStyle,
  inputFileStyle,
  inputSearchStyle,
  btnContainerStyle,
  btnStyle,
  btnName,
  placeholder,
  errorLabel,
  disabledButton,
  btnLoader,
  btnLoaderWidth,
  btnLoaderHeight
}) => {
  const { handleSubmit, register, clearErrors, setValue, formState: { errors } } = useForm()

  const [ufs, setUfs] = useState([])
  const [districts, setDistricts] = useState([])

  const sortValues = (object, field) => (object.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0)))

  useEffect(() => {
    async function getEstados () {
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

  // eslint-disable-next-line no-unused-expressions
  errorLabel || ''

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${containerStyle}`}>
      <div className={`${rowStyle}`}>
        <h2>{formData.label}</h2>
        {formData.map((field, index) => {
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
                    inputFileStyle={inputFileStyle}
                    setValue={setValue}
                  />
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
                </div>
              )
          }
        })}
        <div className={btnContainerStyle}>
          <button disabled={disabledButton !== undefined ? disabledButton : false} type='submit' className={btnStyle}>
            {btnLoader === true ? 
              <Loader
              width={btnLoaderWidth}
              height={btnLoaderHeight}
              type="Oval"
              color="#00BFFF"
            /> : btnName}
          </button>
        </div>
      </div>
    </form>
  )
}

export default RenderForm
