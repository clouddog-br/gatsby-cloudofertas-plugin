import React, { useState } from 'react'
import axios from 'axios'
import slugify from 'slugify'

const Upload = ({ field, register, errors, setValue }) => {
  const [view, setView] = useState(field.label)

  const handleFileInput = async (file) => {
    setView(file ? file.name : '')

    const url = `${process.env.GATSBY_APIURL}/upload/signed-url`
    const slugfiedString = slugify(file.name, { replacement: '_', lower: true })

    const config = {
      headers: {
        accesstoken: process.env.GATSBY_SITE_KEY
      },
      params: { filename: slugfiedString, contentType: file.type }
    }

    try {
      const res = await axios.get(url, config)
      setValue('key', res.data.key)
      setValue('field', field.name)
      await axios.put(res.data.url, file, { headers: { 'Content-Type': file.type } })
    } catch (err) {
      console.log('ERRO: ', err)
    }
  }

  const ValidateExtension = (event) => {
    const file = event[0] ? event[0].name : ''

    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(`([a-zA-Z0-9\s_\\.\-:])+(${field.extension.replaceAll(',', '|').replace(/\s/g, '')})`)

    if (!regex.test(file)) {
      return false
    } else {
      return true
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
