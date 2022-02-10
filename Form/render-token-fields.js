import React, { useState } from 'react'
import axios from 'axios'
import ReactCodeInput from 'react-verification-code-input'

const RenderTokenFields = ({
  formDataId,
  inputTokenStyle,
  register,
  getValues,
  setValue,
  handleTokenError
}) => {
  const [reesendStatus, setReesendStatus] = useState(false)
  const reesendToken = async () => {
    const config = {
      headers: {
        accessToken: process.env.GATSBY_CLOUDOFERTAS_SITE_KEY
      }
    }

    const urlApiToken = `${process.env.GATSBY_CLOUDOFERTAS_API_URL}/sites/${process.env.GATSBY_CLOUDOFERTAS_SITE_ID}/form-data/${formDataId}/reesendToken`
    await axios.patch(urlApiToken, getValues(), config)
    setReesendStatus(true)
    setTimeout(() => {
      setReesendStatus(false)
    }, 10000)
  }

  register('token')

  return (
    <div className={inputTokenStyle}>
      <h3>Autenticação</h3>
      <p>Enviamos um token de autenticação para o seu e-mail. Por favor, insira o código para finalizar a sua solicitação.</p>
      <ReactCodeInput
        onChange={(e) => setValue('token', e)}
      />
      <small>{ handleTokenError }</small>
      { handleTokenError && !reesendStatus &&
        <span onClick={reesendToken}>reenviar código</span>
      }
      { reesendStatus &&
        <p>Codigo Reenviado</p>
      }
  </div>
  )
}

export default RenderTokenFields
