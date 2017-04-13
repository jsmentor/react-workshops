# Lifecycle Methods

## Initialization
The initialization phase is where we define defaults and initial values for `this.props`
and `this.state` by implementing `getDefaultProps()` and `getInitialState()` respectively.

 - getDefaultProps:
   is __called once and cached__ — shared across instances — when the class is created,
   before any instance of the component are created, hence we can’t rely on `this.props` here.
   This method returns an object which properties values will be set on `this.props`
   if that prop is not specified by the parent component.
 - getInitialState:
 is also invoked once, __right before the mounting phase__. The return value of this method
 will be used as initial value of `this.state` and should be an object.
 
## Mounting
These methods are called when an instance of a component is being created and inserted into the DOM:

 1. constructor(): is called before it is mounted:
    - Props: When implementing the constructor for a `React.Component` subclass, you should call super(props)
    before any other statement. Otherwise, `this.props` will be undefined in the constructor,
    which can lead to bugs.
    - State: is the right place to initialize state.
 2. componentWillMount():
   - is invoked immediately before mounting occurs.
   - It is called before `render()`, therefore setting `state` in this method __will not trigger a re-rendering__.
   - __Avoid introducing any side-effects or subscriptions in this method.__
 3. render():
   - returns a single React element
   - should be pure
   - If you need to interact with the browser, perform your work in `componentDidMount()`
 4. componentDidMount():
    - is invoked immediately after a component is mounted.
    - Initialization that requires DOM nodes should go here.
    - If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    - Setting state in this method will trigger a re-rendering.
 
## Updating
An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:

 1. componentWillReceiveProps():
     - is invoked before a mounted component receives new props.
     - If you need to update the state in response to prop changes (for example, to reset it), you may compare this.props and nextProps and perform state transitions using this.setState() in this method.
 2. shouldComponentUpdate()
     - Use it to let React know if a component's output is not affected by the current change in state or props
     - The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.
 3. componentWillUpdate()
    - will not be invoked if `shouldComponentUpdate()` returns false. 
    - is invoked immediately before rendering when new props or state are being received.
    - Use this as an opportunity to perform preparation before an update occurs.
    - This method is not called for the initial render.
 4. render()
 5. componentDidUpdate()
    - is invoked immediately after updating occurs.
    - This method is not called for the initial render.
 
## Unmounting
This method is called when a component is being removed from the DOM:

 1. componentWillUnmount():
    - is invoked immediately before a component is unmounted and destroyed.
    -  Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests,
    or cleaning up any DOM elements that were created in `componentDidMount`.