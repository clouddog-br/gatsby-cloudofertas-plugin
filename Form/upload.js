import React, { useState } from 'react'
import axios from 'axios'
import slugify from 'slugify'

const Upload = ({ field, register, errors, setValue, setDisabledBtn }) => {
  const [view, setView] = useState(field.label)

  const handleFileInput = async (file) => {
    setView(file ? file.name : '')

    const url = `${process.env.GATSBY_CLOUDOFERTAS_API_URL}/upload/signed-url`
    const slugfiedString = slugify(file.name, { replacement: '_', lower: true })

    const config = {
      headers: {
        accesstoken: process.env.GATSBY_CLOUDOFERTAS_SITE_KEY
      },
      params: { filename: slugfiedString, contentType: file.type }
    }

    try {
      setDisabledBtn(true)
      setView('Carregando arquivo...')

      const res = await axios.get(url, config)

      setValue('key', res.data.key)
      setValue('field', field.name)

      await axios.put(res.data.url, file, { headers: { 'Content-Type': file.type } })

      setView(file ? file.name : '')
      setDisabledBtn(false)
    } catch (err) {
      console.log('ERRO: ', err)
    }
  }

  const ValidateExtension = (event) => {
    const file = event[0] ? event[0].name : ''

    const regex = new RegExp(field.extension)

    if (regex.test(file.toLowerCase())) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <label htmlFor={field.name} className={`${errors[field.name] ? 'error' : ''}`}>{view}</label>
      <input
        id={field.name}
        name={field.name}
        type='file'
        className='d-none'
        {...register(field.name, {
          onChange: (e) => { handleFileInput(e.target.files[0]) },
          required: field.required,
          maxLength: field.length !== null && field.length,
          validate: ValidateExtension
        })}
      />
    </>
  )
}

export default Upload