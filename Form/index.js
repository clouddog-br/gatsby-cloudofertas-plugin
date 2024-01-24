/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

/* COMPONENTS */
import RenderFields from './render-fields'
import RenderTokenFields from './render-token-fields'
import RenderBtn from './render-btn'

const RenderForm = (data) => {
  const {
    formData,
    setSuccessSubmit,
    formGroups,
    formGroupsStyle,
    containerStyle,
    rowStyle,
    errorLabel,
    getWatch,
    newValue,
    watchTokenSection,
    queryString
  } = data

  const { handleSubmit, register, setValue, getValues, formState: { errors }, watch } = useForm()

  const [loading, setLoading] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(false)

  const [handleFormDataId, setHandleFormDataId] = useState()
  const [showTokenSection, setShowTokenSection] = useState(false)
  const [handleTokenError, setHandleTokenError] = useState()

  const apiUrl = `${process.env.GATSBY_CLOUDOFERTAS_API_URL}/sites/${process.env.GATSBY_CLOUDOFERTAS_SITE_ID}/form-data/${formData.id}/`
  const apiUrlToken = `${process.env.GATSBY_CLOUDOFERTAS_API_URL}/sites/${process.env.GATSBY_CLOUDOFERTAS_SITE_ID}/form-data/${handleFormDataId}/`

  const terms = data.formData.formTypeField.filter(value => value.type === 'terms')[0]

  if (getWatch !== undefined) {
    useEffect(() => {
      getWatch(watch())
    })
  }

  if (newValue !== undefined) {
    useEffect(() => {
      newValue(setValue)
    })
  }

  // function getCampaignAttributes() {
  //   var urlParams = new URLSearchParams(window.location.search);
  //   var gclid = urlParams.get('gclid');
  //   var utm_source = urlParams.get('utm_source');
  //   var utm_medium = urlParams.get('utm_medium');
  //   var utm_campaign = urlParams.get('utm_campaign');
  //   var utm_id = urlParams.get('utm_id');
  //   var utm_term = urlParams.get('utm_term');
  //   var utm_content = urlParams.get('utm_content');


  //   return {
  //     gclid: gclid,
  //     utm_source: utm_source,
  //     utm_medium: utm_medium,
  //     utm_campaign: utm_campaign,
  //     utm_id: utm_id,
  //     utm_term: utm_term,
  //     utm_content: utm_content
  //   }
  // }

  // useEffect(() => {
  //   var campaignAttributes = getCampaignAttributes();
  //   setValue('gclid', campaignAttributes['gclid']);
  //   setValue('utm_source', campaignAttributes['utm_source']);
  //   setValue('utm_medium', campaignAttributes['utm_medium']);
  //   setValue('utm_campaign', campaignAttributes['utm_campaign']);
  //   setValue('utm_id', campaignAttributes['utm_id']);
  //   setValue('utm_term', campaignAttributes['utm_term']);
  //   setValue('utm_content', campaignAttributes['utm_content']);
  // })

  if (watchTokenSection !== undefined) {
    watchTokenSection(showTokenSection)
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

  function getCookie(k) {
    var cookies = " " + document.cookie;
    var key = " " + k + "=";
    var start = cookies.indexOf(key);

    if (start === -1) return null;

    var pos = start + key.length;
    var last = cookies.indexOf(";", pos);

    if (last !== -1) return cookies.substring(pos, last);

    return cookies.substring(pos);
}

  const onSubmit = async (data) => {
    setLoading(true)
    setDisabledBtn(true)
    try {
      const config = {
        headers: {
          accessToken: process.env.GATSBY_CLOUDOFERTAS_SITE_KEY
        }
      }

      // Define the variables
      var gclid = getCookie('gclid');
      var utm_source = getCookie('utm_source');

      if(gclid) data.gclid = gclid
      if(utm_source) data.utm_source = utm_source

      if (formData.has_rdstation && queryString) {
        const jsonUTM = {}

        queryString.split('?')[1].split('&').map(item => {
          const splitedItem = item.split('=')
          jsonUTM[splitedItem[0]] = splitedItem[1]
        })

        data.traffic_source = jsonUTM.utm_source
        data.traffic_medium = jsonUTM.utm_medium
        data.traffic_campaign = jsonUTM.utm_campaign
        data.traffic_value = jsonUTM.utm_term
      }

      if (document.referrer) {
        data.referrer = document.referrer
      }

      if (terms !== undefined) {
        data.termos = terms.formTerms.version
      }

      if (!formData.has_token) {
        const result = await axios.post(apiUrl, data, config)
        if (setSuccessSubmit !== undefined) {
          setSuccessSubmit(true)
        }
        console.log('result:', result)
      } else {
        if (showTokenSection) {
          const result = await axios.patch(apiUrlToken, { token: data.token }, config)
          if (setSuccessSubmit !== undefined) {
            setSuccessSubmit(true)
          }
          setDisabledBtn(false)

          console.log('result: ', result)
        } else {
          const result = await axios.post(apiUrl, data, config)
          setHandleFormDataId(result.data.url.split('/')[3])
          setShowTokenSection(true)
          setDisabledBtn(false)

          console.log('result:', result)
        }
      }

      setLoading(false)
    } catch (err) {
      setDisabledBtn(false)
      setLoading(false)
      if (formData.has_token) {
        setHandleTokenError(err.response.data.error)
      }
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit((data) => {
      PushDataLayer()
      onSubmit(data)
    })} className={`${containerStyle}`}>
      <div>
        {/* <input
          id="zc_gad"
          name="zc_gad"
          type="hidden"
          placeholder="zc_gad"
          className=""
          {...register("zc_gad", { required: false })}
        /> */}
        {filterData &&
          filterData.map((group, index) => {
            return (
              <div key={index}>
                <p className={formGroupsStyle}>{group.name}</p>
                <div className={`${rowStyle}`}>
                  {!showTokenSection &&
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
                      {showTokenSection &&
                        <RenderTokenFields
                          {...data}
                          handleFormDataId={handleFormDataId}
                          register={register}
                          getValues={getValues}
                          setValue={setValue}
                          handleTokenError={handleTokenError}
                        />
                      }
                      <RenderBtn
                        {...data}
                        showTokenField={showTokenSection}
                        disabledBtn={disabledBtn}
                        btnLoader={loading}
                      />
                    </>
                  }
                </div>
              </div>
            )
          })
        }
        {!filterData &&
          <div className={`${rowStyle}`}>
            {!showTokenSection &&
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
            {showTokenSection &&
              <RenderTokenFields
                {...data}
                handleFormDataId={handleFormDataId}
                register={register}
                getValues={getValues}
                setValue={setValue}
                handleTokenError={handleTokenError}
              />
            }
            <RenderBtn
              {...data}
              showTokenField={showTokenSection}
              disabledBtn={disabledBtn}
              btnLoader={loading}
            />
          </div>
        }
      </div>
    </form>
  )
}

export default RenderForm
