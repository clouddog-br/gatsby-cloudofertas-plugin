import React, { useState } from 'react'
import axios from 'axios'
import slugify from 'slugify'

const Upload = ({ field, register, errors, setValue }) => {
  const [view, setView] = useState('Nenhum arquivo selecionado')

  const handleFileInput = async (file) => {
    setView(file.name)
    const url = 'https://vngj04zh27.execute-api.us-east-1.amazonaws.com/dev/upload/signed-url'
    const slugfiedString = slugify(file.name, { replacement: '_', lower: true })

    const config = {
      headers: {
        accesstoken: process.env.GATSBY_SITE_KEY
      },
      params: { filename: slugfiedString, contentType: file.type }
    }

    console.log('entrou')
    try {
      const res = await axios.get(url, config)
      setValue('key', res.data.key)
      setValue('field', field.name)
      const resp = await axios.put(res.data.url, file, { headers: { 'Content-Type': file.type } })
      console.log(resp)
    } catch (err) {
      console.log('ERRO: ', err)
    }
  }

  return (
    <>
      <label htmlFor={field.name} className={`${errors[field.name] ? 'error' : ''} d-block`}>{view}</label>
      <input
        id={field.name}
        name={field.name}
        type='file'
        className='d-none'
        {...register(field.name, { required: field.required, maxLength: field.length !== null && field.length })}
        onChange={(event) => handleFileInput(event.target.files[0])}
      />
    </>
  )
}

export default Upload
