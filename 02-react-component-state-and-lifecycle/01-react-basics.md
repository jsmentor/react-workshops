# Lets first cover some basics

## What is React?
A Javascript library for creating user interfaces, authored by Facebook and Instagram engineers.
It’s aimed to solve the challenges involved when developing complex user interfaces
with __datasets that change over time__, which in front-end development is considered as:   
__the root of all evil.__

## What makes React different?
React allows us to simply express how our app should look based on our data
_at any point in time_. When data changes React automatically handles
_all the Changes in the User Interface_ without us having to deal with __DOM__.
React uses a fast, in-memory and lightweight representation of the DOM called
__virtual DOM__.
React basically uses a very optimized diff algorithm that compares the virtual DOM
of the current and the previous state.

### Question: Does anyone need to know more about __DOM Manipulation__?
If _YES_ lets open a web page []() and try some live coding:
```javascript
var questions = [{
  viewsCount: 1
}, {
  viewsCount: 11
}];
function incrementViewsCount(questionIndex) {
  let questionData = questions[questionIndex];
  if(!questionData){
    console.log('Invalid questionIndex');
    return;
  }
  let questionElement = document.querySelectorAll('.question-summary')[questionIndex];
  let viewElement = questionElement.querySelector('.views span');
  let viewsCount = viewElement.innerHTML;
  viewsCount = Number.parseInt(viewsCount);
  if(Number.isNaN(viewsCount)){
    console.log('Invalid view element');
    return;
  }
  
  viewsCount++;
  
  questionData.viewsCount = viewsCount;
  
  // Update the DOM Element
  viewElement.innerHTML = viewsCount;
}
```

# React is all about components
Components are the core of React and the view to your application.
They are encapsulated and composable, you can mix and match them
to build complex UIs favoring code reuse and separation of concerns.