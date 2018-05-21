# pure-react

Wrapper for React to write code in more elegant, functional style and speed up development.

## Installation

```
npm install pure-react --save
```

## Basic usage

```javascript
  const {view, text} = require('pure-react')

  let style = {...}

  const app = () =>
    view(style.wrap,
      text('hello', style.text)
    )
```

## Documentation

  ### Updates
  Controls app state

  ```javascript
    const {updates, view, button, text} = require('pure-react')

    let store = {
      update : updates()
      counter: 0
    }

    const app = () =>
      view({}, {
        update: store.update, id: 'app', from: 'counter'
      },
        () => text(store.counter)(), //updatable component must be a function
        button('+', {}, {
          onPress: () => {
            store.counter++
            store.update.do('app')
          }
        })

      )
  ```
  Life-cycle:
  ```javascript
    view({}, {
      willmount  : () => {}, // component will mount
      didmount   : () => {}, // component did mount
      willupdate : () => {}, // component will update
      didupdate  : () => {}, // component did update
      willunmount: () => {}  // component will unmount
    })
  ```

  `update.do(id, [from])`
  ```javascript
    update.do('app') //update full group
    update.do('app', ['counter', 'name']) // update some of group
  ```

  `update.sub(id, [from])`
  ```javascript
    update.sub('app', ['counter']) // sub component
  ```

  `update.unsub(id, [from])`
  ```javascript
    update.unsub('app', ['counter']) // unsub component
  ```

  `update.list`
  ```javascript
    console.log(update.list) // Array of subscribers
  ```

  ### Components

  `view(style, props, children)`  if you haven't props, just use `view(style, children)`

  `button(children, style, props)` or `button(style, props, children)`

  `text(children, style, props)`

  `textinput(style, props)`

  `image(style, props)`

  `component(style, props)` or `component(props)` if component don't have style

  All React apis and components available in lowercase


  ## Example
  ```javascript

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
  ```
