
const {react, updates, view, text, button} = require('pure-react')

const style = {
  wrap: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scenes: {
    display: 'flex',
    flexDirection: 'row'
  },
  scene: (backgroundColor) => ({
    width: 150,
    height: 240,
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor
  }),
  button: {
    margin: 5,
    color: 'blue'
  }
}

const counter = (state) =>
  text(state.counter)

const scene = (color, state, store) =>
  view(style.scene(color), {
    update: store.update, id: 'counter',
  },
    () => counter(state)()
  )

const scenes = (state, store) =>
  view(style.scenes,
    scene('whitesmoke', state, store),
    scene('pink', state, store)
  )

const handle = (id, i, state, store) =>
  button(id, style.button, {
    onPress: () => {
      state.counter += i
      store.update.do('counter')
    }
  })


const testapp = (store) => {
  let state = {
    counter: 0
  }

  return view(style.wrap,
    scenes(state, store),
    handle('counter++', 1, state, store),
    handle('counter--', -1, state, store),
  )
}


let store = {
  update: updates()
}


export default class App extends react.Component {
  render = () => testapp(store)()
}
