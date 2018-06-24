# pure-react

Wrapper for React to write code in more elegant, functional style and speed up development.

Built-in State Control, so you don’t need redux/mobx anymore.

## Installation
```
yarn add pure-react
```
or
```
npm i pure-react --save
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
  Controls app state.
  
  All you need is add ```{id: '...'}``` to component props and then ```update.do(id)``` to make update.

  ```javascript
    const {update, view, button, text} = require('pure-react')


    const app = () => {
      let state = {
        counter: 0
      }

      return view({}, {id: 'app'}, //or view({}, {update, id: 'app'})
        () => text(state.counter)(), //updatable component must be a function
        button('+', {}, {
          onClick: () => {
            state.counter++
            update.do('app')
          }
        })
      )
    }
  ```
  
  Add prop ```{from: '...'}``` for partial updates.
  
  For example, you have component 'header' with childs 'name', 'ready', 'score', 'notification', etc.
  
  ```javascript
    const header = () =>
      view({},
        view({}, {id: 'header', from: 'name'})
        view({}, {id: 'header', from: 'ready'})
        view({}, {id: 'header', from: 'score'})     
        view({}, {id: 'header', from: 'notification'})
      )
  ```
  
  Now, you can update full group by ```update.do('header')``` or partially ```update.do('header', ['ready', 'score'])```

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

  `update.list`
  ```javascript
    console.log(update.list) // Array of subscribers
  ```


  ### Store
  Global object for your application.
  ```javascript
    const {store, text} = require('pure-react')

    store.settings = {...}
    store.user = {...}
    store.version = {...}

    const app = () =>
      text(store.settings.value)
  ```


  ### Components
  All React components and apis available in lowercase.

  `view(style, props, children)`  if you haven't props, just use `view(style, children)` *//or div*
  
  `button(children, style, props)` or `button(style, props, children)`
  
  `text(children, style, props)` *//or p*
  
  `textinput(style, props)` *//or textarea*
  
  `image(style, props)` *//or img*
  
  `...`
  
  `component(style, props, children)` or `component(props)`



  ## Example
  ```javascript

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
  ```
