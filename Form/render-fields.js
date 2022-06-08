import React, { useState } from 'react'

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

/* JSON */
import localidades from '../utils/estados-cidades.json'

const RenderFields = ({
  formFields,
  customFields,
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
  const [districts, setDistricts] = useState([])

  const handleStateSelected = (estado) => {
    const selectedUf = localidades.estados.filter((uf) => (uf.nome === estado || uf.sigla === estado))[0]
    setDistricts(selectedUf.cidades)
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
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
                </div>
              )
            case 'state':
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                  <State
                    ufs={localidades.estados}
                    field={field}
                    register={register}
                    handleState={handleStateSelected}
                    errors={errors}
                  />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
                </div>
              )
            case 'city':
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                  <City
                    districts={districts}
                    field={field}
                    register={register}
                    errors={errors}
                  />
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
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
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
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
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
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
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
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
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
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
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
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
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
                </div>
              )
            case 'customfield':
              return (
                <div key={`${field.id}-${index}`} className={`${inputStyle} ${field.style}`}>
                  {customFields[field.name](
                    field,
                    register,
                    errors,
                    setValue,
                    handleStateSelected
                  )}
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
                  {errorLabel === 'bottom' && errors[field.name] && <small>Campo obrigatório</small>}
                </div>
              )
          }
        })
      }
    </>
  )
}

export default RenderFields
