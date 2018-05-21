
const React = require('react')

const Component = require('./component')

const react = React


const updates = (arr = []) => ({
  list: arr,
  do: (id, from) =>
    from instanceof Array
      ? arr[id] && arr[id].forEach(item => from.forEach(itemfrom => item.from == itemfrom && item.cb()))
      : arr[id] && arr[id].forEach(item => item.cb()),
  sub: (id, from, cb) =>
    arr[id]
      ? arr[id].push({from, cb})
      : arr[id] = [{from, cb}],
  unsub: (id, from) =>
    from
      ? arr[id] && arr[id].some((item, i) => item.from == from && arr[id].splice(i, 1))
      : arr[id] = []
})


const carry = arr =>
  arr instanceof Array
    ? arr.map(item => carry(item))
    : arr instanceof Function
      ? arr()
      : arr

const split = props =>
  props[0] && props[0] instanceof Function
    ? ({props: {}, children: props})
    : ({props: props.shift(), children: props})

const swapbutton = (children, style, props) => {
  let flag = false

  if (typeof children !== 'string') {
    flag = true
    [children, style, props] = [props, children, style]
  }

  return flag
    ? component('a', style, {props, children})
    : component('a', {}, {
      props: props[0],
      children: component('p', style, {children})
    })
}


const updatekeys = ['id', 'from', 'update', 'willmount', 'didmount', 'willupdate', 'didupdate', 'willunmount']

const justcomponent = (element, style, props, children) => {
  let haschild = children && ((children instanceof Array && children.length > 0) || typeof children == 'string' || children.type && true)

  let elementprops = Object.assign({}, {style}, props, haschild ? {children} : {})

  return React.createElement(element, elementprops)
}

const component = (id, style, {props = {}, children}) => {
  if (props.update || props.willmount || props.didmount || props.willunmount) {
    let updateprops = {}

    updatekeys.forEach(key => {
      if (props[key]) {
        updateprops[key] = props[key]
        delete props[key]
      }
    })

    let componentprops = Object.assign({}, updateprops, {children: () => justcomponent(id, style, props, carry(children))})

    return React.createElement(Component, componentprops)
  }

  else return justcomponent(id, style, props, carry(children))
}


const html = (style, ...props) => () => component('html', style, split(props))
const head = (style, ...props) => () => component('head', style, split(props))
const link = (...props) => () => component('link', {}, split(props))
const script = (...props) => () => component('script', {}, split(props))
const title = (style, ...props) => () => component('title', style, split(props))
const body = (style, ...props) => () => component('body', style, split(props))
const meta = (style, ...props) => () => component('meta', style, split(props))
const br = (style, ...props) => () => component('br', style, split(props))
const hr = (style, ...props) => () => component('hr', style, split(props))

const address = (style, ...props) => () => component('address', style, split(props))
const b = (style, ...props) => () => component('b', style, split(props))
const blockquote = (style, ...props) => () => component('blockquote', style, split(props))
const code = (style, ...props) => () => component('code', style, split(props))
const i = (style, ...props) => () => component('i', style, split(props))
const s = (style, ...props) => () => component('s', style, split(props))
const small = (style, ...props) => () => component('small', style, split(props))
const strong = (style, ...props) => () => component('strong', style, split(props))
const sub = (style, ...props) => () => component('sub', style, split(props))
const sup = (style, ...props) => () => component('sup', style, split(props))
const template = (style, ...props) => () => component('template', style, split(props))
const time = (style, ...props) => () => component('time', style, split(props))

const a  = (children, style, ...props) => () => swapbutton(children, style, props)
const form = (style, ...props) => () => component('form', style, split(props))
const input = (style, ...props) => () => component('input', style, split(props))
const textarea = (style, props) => () => component('textarea', style, {props})
const textinput = (style, props) => () => component('textarea', style, {props})
const button  = (children, style, ...props) => () => swapbutton(children, style, props)
const select = (style, ...props) => () => component('select', style, split(props))
const option = (style, ...props) => () => component('option', style, split(props))
const label = (style, ...props) => () => component('label', style, split(props))

const img = (src, style, props) => () => component('img', style, {props: Object.assign(src, props)})
const image = (src, style, props) => () => component('img', style, {props: Object.assign(src, props)})
const canvas = (style, ...props) => () => component('canvas', style, split(props))
const picture = (style, ...props) => () => component('picture', style, split(props))
const audio = (style, ...props) => () => component('audio', style, split(props))
const video = (style, ...props) => () => component('video', style, split(props))

const ul = (style, ...props) => () => component('ul', style, split(props))
const ol = (style, ...props) => () => component('ol', style, split(props))
const li = (style, ...props) => () => component('li', style, split(props))
const dl = (style, ...props) => () => component('dl', style, split(props))
const dt = (style, ...props) => () => component('dt', style, split(props))
const dd = (style, ...props) => () => component('dd', style, split(props))
const menu = (style, ...props) => () => component('menu', style, split(props))
const menulist = (style, ...props) => () => component('menulist', style, split(props))

const table = (style, ...children) => () => component('table', style, {children})
const caption = (style, ...children) => () => component('caption', style, {children})
const th = (children, style, props) => () => component('th', style, {props, children})
const tr = (style, ...props) => () => component('tr', style, split(props))
const td = (children, style, props) => () => component('td', style, {props, children})
const thead = (...props) => () => component('thead', {}, split(props))
const tbody = (...props) => () => component('tbody', {}, split(props))
const tfoot = (...props) => () => component('tfoot', {}, split(props))
const col = (...props) => () => component('col', {}, split(props))
const colgroup = (...props) => () => component('colgroup', {}, split(props))

const view = (style, ...props) => () => component('div', style, split(props))
const div = (style, ...props) => () => component('div', style, split(props))
const span = (style, ...props) => () => component('span', style, split(props))
const header = (style, ...props) => () => component('header', style, split(props))
const footer = (style, ...props) => () => component('footer', style, split(props))
const main = (style, ...props) => () => component('main', style, split(props))
const section = (style, ...props) => () => component('section', style, split(props))
const article = (style, ...props) => () => component('article', style, split(props))
const aside = (style, ...props) => () => component('aside', style, split(props))
const details = (style, ...props) => () => component('details', style, split(props))
const dialog = (style, ...props) => () => component('dialog', style, split(props))
const summary = (style, ...props) => () => component('summary', style, split(props))
const data = (style, ...props) => () => component('data', style, split(props))

const text = (children, style, props) => () => component('p', style, {props, children})
const p = (children, style, props) => () => component('p', style, {props, children})
const h1 = (children, style, props) => () => component('h1', style, {props, children})
const h2 = (children, style, props) => () => component('h2', style, {props, children})
const h3 = (children, style, props) => () => component('h3', style, {props, children})
const h4 = (children, style, props) => () => component('h4', style, {props, children})
const h5 = (children, style, props) => () => component('h5', style, {props, children})
const h6 = (children, style, props) => () => component('h6', style, {props, children})


module.exports = {
  updates, react,
  html, head, link, script, title, body, meta, br, hr,
  address, b, blockquote, code, i, s, small, strong, sub, sup, template, time,
  a, form, input, textarea, textinput, button, select, option, label,
  img, image, canvas, picture, audio, video,
  ul, ol, li, dl, dt, dd, menu, menulist,
  table, caption, th, tr, td, thead, tbody, tfoot, col, colgroup,
  text, p, h1, h2, h3, h4, h5, h6,
  view, div, span, header, footer, main, section, article, aside, details, dialog, summary, data
}
