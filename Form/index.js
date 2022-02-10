/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

/* COMPONENTS */
import RenderFields from './render-fields'
import RenderTokenFields from './render-token-fields'
import RenderBtn from './render-btn'

const RenderForm = (data) => {
  const {
    showTokenField,
    formData,
    formGroups,
    formGroupsStyle,
    containerStyle,
    rowStyle,
    errorLabel,
    onSubmit,
    getWatch
  } = data

  const { handleSubmit, register, setValue, getValues, formState: { errors }, watch } = useForm()
  const [disabledBtn, setDisabledBtn] = useState(false)

  if (getWatch !== undefined) {
    useEffect(() => {
      getWatch(watch())
    })
  }

  // eslint-disable-next-line no-unused-expressions
  errorLabel || ''

  const filterData = formGroups
    ? formGroups.map(group => {
      group.formData = formData.formTypeField.filter(field => {
        if (group.id === field.formGroups.id) {
          return field
        }
      })

      return group
    })
    : ''

  const PushDataLayer = () => {
    if (typeof window !== 'undefined') {
      if (window.dataLayer) {
        window.dataLayer.push({ form: null })
        window.dataLayer.push({
          event: 'generate_lead',
          form: {
            type: formData.name
          }
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit((data) => {
      onSubmit(data)
      PushDataLayer()
    })} className={`${containerStyle}`}>
      <div>
        { filterData &&
          filterData.map((group, index) => {
            return (
              <>
                <p className={formGroupsStyle}>{group.name}</p>
                <div className={`${rowStyle}`}>
                  {!showTokenField &&
                    <RenderFields
                      {...data}
                      formFields={group.formData}
                      register={register}
                      getValues={getValues}
                      setValue={setValue}
                      errors={errors}
                      setDisabledBtn={setDisabledBtn}
                    />
                  }
                  {filterData.length === index + 1 &&
                  <>
                    {showTokenField &&
                        <RenderTokenFields
                          {...data}
                          register={register}
                          getValues={getValues}
                          setValue={setValue}
                        />
                      }
                    <RenderBtn
                      {...data}
                      disabledBtn={disabledBtn}
                    />
                  </>
                  }
                </div>
              </>
            )
          })
        }
        { !filterData &&
          <div className={`${rowStyle}`}>
            {!showTokenField &&
              <RenderFields
                {...data}
                formFields={formData.formTypeField}
                register={register}
                getValues={getValues}
                setValue={setValue}
                errors={errors}
                setDisabledBtn={setDisabledBtn}
              />
            }
            {showTokenField &&
              <RenderTokenFields
                {...data}
                register={register}
                getValues={getValues}
                setValue={setValue}
              />
            }
            <RenderBtn
              {...data}
              disabledBtn={disabledBtn}
            />
          </div>
        }
      </div>
    </form>
  )
}

export default RenderForm
