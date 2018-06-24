
const {react, update, view, text, button} = require('pure-react')

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

const scene = (color, state) =>
  view(style.scene(color), {id: 'counter'},
    () => counter(state)()
  )

const scenes = (state) =>
  view(style.scenes,
    scene('whitesmoke', state),
    scene('pink', state)
  )

const handle = (id, i, state) =>
  button(id, style.button, {
    onClick: () => {
      state.counter += i
      update.do('counter')
    }
  })


const testapp = () => {
  let state = {
    counter: 0
  }

  return view(style.wrap,
    scenes(state),
    handle('counter++', 1, state),
    handle('counter--', -1, state),
  )
}


export default class App extends react.Component {
  render = () => testapp()()
}
