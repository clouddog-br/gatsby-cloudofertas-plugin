import React from 'react'
import { ClipLoader } from 'react-spinners'

const RenderBtn = ({
  btnContainerStyle,
  btnStyle,
  btnName,
  btnLoader,
  btnLoaderContainer,
  btnLoaderLabel,
  btnLoaderColor,
  btnLoaderSize,
  disabledButton,
  disabledBtn
}) => {
  return (
    <div className={btnContainerStyle}>
      <button disabled={!!(disabledBtn || disabledButton)} type='submit' className={btnStyle}>
        {btnLoader === true
          ? <div className={btnLoaderContainer}>
              <ClipLoader
                size={btnLoaderSize}
                color={btnLoaderColor}
              />
              <span>
                {btnLoaderLabel}
              </span>
            </div>
          : btnName}
      </button>
    </div>
  )
}

export default RenderBtn
