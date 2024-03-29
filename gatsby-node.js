exports.onPreInit = () => console.info('Loaded gatsby-plugin-cloudofertas')
const { default: Axios } = require('axios')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const defaultEnv = 'dev'

const getOptions = pluginOptions => {
  const options = { ...pluginOptions }
  delete options.plugins
  const {
    env = {},
    resolveEnv = () => process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV
  } = options
  const envOptions = env[resolveEnv()] || env[defaultEnv] || {}
  const environment = resolveEnv()
  delete options.env
  delete options.resolveEnv
  return {
    environment,
    ...options,
    ...envOptions
  }
}

async function InfoCloudOfertas(actions, createContentDigest, createNodeId, pluginOptions) {
  const { createNode } = actions

  let url

  if (pluginOptions.environment === 'dev') {
    url = `https://api-cloudofertas.dev.clouddog.com.br/organization/sites/${pluginOptions.siteId}/build`
  } else if (pluginOptions.environment === 'prd') {
    url = `https://api.cloudofertas.com.br/organization/sites/${pluginOptions.siteId}/build`
  }

  try {
    const config = {
      headers: {
        accesstoken: pluginOptions.accessToken
      }
    }

    const { data } = await Axios.get(url, config)

    if (data.banners.length > 0) {
      data.banners.forEach(banner => {
        createNodeHandler(createNode, createNodeId, createContentDigest, banner, 'CloudOfertasBanner')
      })
    }
    if (data.lojas.length > 0) {
      data.lojas.forEach(loja => {
        createNodeHandler(createNode, createNodeId, createContentDigest, loja, 'CloudOfertasLoja')
      })
    }
    if (data.tabloides.length > 0) {
      data.tabloides.forEach(tabloide => {
        createNodeHandler(createNode, createNodeId, createContentDigest, tabloide, 'CloudOfertasTabloide')
      })
    }
    if (data.categories.length > 0) {
      data.categories.forEach(categoria => {
        createNodeHandler(createNode, createNodeId, createContentDigest, categoria, 'CloudOfertasCategoria')
      })
    }
    if (data.forms.length > 0) {
      data.forms.forEach(form => {
        createNodeHandler(createNode, createNodeId, createContentDigest, form, 'CloudOfertasForm')
      })
    }
  } catch (err) {
    console.log('> CloudOfertas Plugin Error =>', err)
  }
}

function createNodeHandler(createNode, createNodeId, createContentDigest, item, type) {
  createNode({
    // id: createNodeId(item.id),
    ...item,
    parent: null,
    children: [],
    internal: {
      type: type,
      content: JSON.stringify(item),
      contentDigest: createContentDigest(item)
    }
  })
}

/* Create Images */
exports.onCreateNode = async ({
  actions: { createNode },
  getCache,
  createNodeId,
  node
}) => {
  if (node.internal.type === 'CloudOfertasBanner') {
    let banner, mobileBanner
    if (node.banner) {
      banner = await createRemoteFileNode({
        url: node.banner,
        getCache,
        createNode,
        createNodeId,
        parentNodeId: node.id
      })
      node.banner = banner.id
    }
    if (node.mobileBanner) {
      mobileBanner = await createRemoteFileNode({
        url: node.mobileBanner,
        getCache,
        createNode,
        createNodeId,
        parentNodeId: node.id
      })
      node.mobileBanner = mobileBanner.id
    }
  }
  if (node.internal.type === 'CloudOfertasLoja') {
    let loja
    if (node.image) {
      loja = await createRemoteFileNode({
        url: node.image,
        getCache,
        createNode,
        createNodeId,
        parentNodeId: node.id
      })
      node.image = loja.id
    }
  }
  // if (node.internal.type === 'CloudOfertasTabloide') {
  //   node.offer.forEach(off => {
  //     let imagem
  //     if (off.image) {
  //       imagem = await createRemoteFileNode({
  //         url: off.image,
  //         getCache,
  //         createNode,
  //         createNodeId,
  //         parentNodeId: off.id
  //       })
  //       off.image = imagem.id
  //     }
  //   })
  // }
  if (node.internal.type === 'CloudOfertasCategoria') {
    let categoria
    if (node.icon) {
      categoria = await createRemoteFileNode({
        url: node.icon,
        getCache,
        createNode,
        createNodeId,
        parentNodeId: node.id
      })
      node.icon = categoria.id
    }
  }
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}, pluginOptions) => {
  const userOptions = getOptions(pluginOptions)

  if (userOptions.siteId === undefined) {
    throw Error("Obrigatório definir o 'siteId' no plugin do cloudofertas")
  }
  if (userOptions.accessToken === undefined) {
    throw Error("Obrigatório definir o 'accessToken' no plugin do cloudofertas")
  }

  await InfoCloudOfertas(actions, createContentDigest, createNodeId, userOptions)
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type CloudOfertasBanner implements Node {
      id: Int
      active: Boolean
      banner: File @link
      mobileBanner: File @link
      startDate: Date
      finishDate: Date
      title: String
      status: String
      url: String
      target: String
      tariff: CloudOfertasTarifa
      showAll: Boolean
    }
    
    type CloudOfertasLoja implements Node {
      id: Int
      name: String
      reference: String
      address: String
      district: String
      city: String
      uf: String
      cep: String
      lat: String
      lng: String
      image: File @link
      fone1: String
      fone2: String
      slug: String
      storeNumber: Int
      whatsapp: String
      tariffStartDate: Date
      services: [CloudOfertasServico]
      tariff: CloudOfertasTarifa
      additionalTariff: CloudOfertasTarifa
      sundayIsOpenDelivery: Boolean
      sundayOpenDelivery: String
      sundayCloseDelivery: String
      mondayIsOpenDelivery: Boolean
      mondayOpenDelivery: String
      mondayCloseDelivery: String
      tuesdayIsOpenDelivery: Boolean
      tuesdayOpenDelivery: String
      tuesdayCloseDelivery: String
      wednesdayIsOpenDelivery: Boolean
      wednesdayOpenDelivery: String
      wednesdayCloseDelivery: String
      thursdayIsOpenDelivery: Boolean
      thursdayOpenDelivery: String
      thursdayCloseDelivery: String
      fridayIsOpenDelivery: Boolean
      fridayOpenDelivery: String
      fridayCloseDelivery: String
      saturdayIsOpenDelivery: Boolean
      saturdayOpenDelivery: String
      saturdayCloseDelivery: String
      holidayIsOpenDelivery: Boolean
      holidayOpenDelivery: String
      holidayCloseDelivery: String
      sundayIsOpen: Boolean
      sundayOpen: String
      sundayClose: String
      mondayIsOpen: Boolean
      mondayOpen: String
      mondayClose: String
      tuesdayIsOpen: Boolean
      tuesdayOpen: String
      tuesdayClose: String
      wednesdayIsOpen: Boolean
      wednesdayOpen: String
      wednesdayClose: String
      thursdayIsOpen: Boolean
      thursdayOpen: String
      thursdayClose: String
      fridayIsOpen: Boolean
      fridayOpen: String
      fridayClose: String
      saturdayIsOpen: Boolean
      saturdayOpen: String
      saturdayClose: String
      holidayIsOpen: Boolean
      holidayOpen: String
      holidayClose: String
      status: Boolean
    }

    type CloudOfertasServico implements Node {
      id: Int
      createdDate: Date
      icon: String
      lojas: String
      name: String
      updatedDate: Date
    }

    type CloudOfertasTabloide implements Node {
      id: Int
      startDate: Date
      finishDate: Date
      legalText: String
      status: String
      offer: [CloudOfertasOferta]
      createdDate: Date
      finishDate: Date
      legalText: String
      startDate: Date
      status: String
      tariff: CloudOfertasTarifa
    }

    type CloudOfertasOferta implements Node {
      id: Int
      linkBanner: String
      category: CloudOfertasCategoria
      format: Int
      image: String
      startDate: Date
      finishDate: Date
      brand: CloudOfertasBrand
      order: Int
      tag: String
      ownBrand: Boolean
      specialOffers: Boolean
    }

    type CloudOfertasBrand implements Node {
      id: String
      name: String
    }

    type CloudOfertasCategoria implements Node {
      id: Int
      name: String
      type: String
      tag: String
      brand: [CloudOfertasBrand]
      icon: File @link
      sequence: Int
      createdDate: Date
      updatedDate: Date
    }

    type CloudOfertasTarifa implements Node {
      id: Int
      createdDate: Date
      name: String
      type: String
      updatedDate: Date
    }

    type CloudOfertasForm implements Node {
      id: String
      name: String
      forward_list: String
      feedback_notification_template: String
      forward_notification_template: String
      send_feedback: Boolean
      has_token: Boolean
      formGroups: [CloudOfertasFormGroups]
      formTypeField: [CloudOfertasFormFields]
    }

    type CloudOfertasFormFields implements Node {
      id: String
      name: String
      label: String
      length: Int
      required: Boolean
      style: String
      type: String
      mask: String
      extension: String
      formLov:CloudOfertasFormLov
      formTerms:CloudOfertasFormTerms
      formGroups:CloudOfertasFormGroups
    }

    type CloudOfertasFormTerms implements Node {
      id: String
      name: String
      contract: String
      version: String
    }

    type CloudOfertasFormGroups implements Node {
      id: String
      name: String
      order: String
    }

    type CloudOfertasFormLov implements Node {
      id: String
      name: String
      descricao: String
      formLovData: [CloudOfertasFormLovData!]
    }

    type CloudOfertasFormLovData implements Node {
      id: String
      value: String
      createdDate: Date
    }
   `
  createTypes(typeDefs)
}
