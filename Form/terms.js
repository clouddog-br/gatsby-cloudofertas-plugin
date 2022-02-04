/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'
import parse from 'html-react-parser'
import ReactMarkdown from 'react-markdown'

import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

const LinkRenderer = ({ href, children }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

const Terms = ({ field, register, errors, errorLabel, setValue, getValues, modalStyle, modalCheckBoxStyle }) => {
  const [open, setOpen] = useState(false)

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  return (
    <>
      {errorLabel === 'top' && <small>{errors[field.name] && 'Campo obrigatatório'}</small>}
      <div>
        <input
          id={field.name}
          name={field.name}
          type="checkbox"
          {...register(field.name, { required: field.required })}
        />
        <label htmlFor={field.name}>⠀</label>
        <span className={`${errors[field.name] ? 'error' : ''}`} onClick={() => onOpenModal()}>{parse(field.label)}</span>
      </div>
      <Modal open={open} onClose={onCloseModal} classNames={{ modal: modalStyle }} center>
        <div>
          <ReactMarkdown components={{ a: LinkRenderer }}>{field.formTerms.contract}</ReactMarkdown>
          <div className={modalCheckBoxStyle} >
            <input
              id={`${field.name}-open`}
              name={`${field.name}-open`}
              type="checkbox"
              checked={getValues(field.name)}
              readOnly
            />
            <label htmlFor={`${field.name}-open`} onClick={() => { onCloseModal(); setValue(field.name, !getValues(field.name)) }}>{parse(field.label)}</label>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Terms
