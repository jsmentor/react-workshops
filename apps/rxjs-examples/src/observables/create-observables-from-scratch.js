import $ from 'jquery';
import Rx from 'rxjs/Rx';

const source$ = new Rx.Observable(observer => {
  console.log('Creating Observable');
  // Do whatever you need!
  console.log('Emmit the first value for those who have subscribed!');
  observer.next('First Value');
  // Do whatever you need!
  console.log('Emmit another value');
  observer.next('Second Value');

  console.log('%c Now lets emmit couple of values asynchronously ', 'background: #ccc; color: red');

  setTimeout(() => {
    observer.next('An Async Value!');
  }, 1000);

  setTimeout(() => {
    observer.next('Another Async Value!');
  }, 2000);

  // observer.error(Error('An error message'));

  setTimeout(() => {
    observer.next('Final Async Value!');
    observer.complete();
  }, 3000);

  setTimeout(() => {
    observer.next('Another Async Value after completion!');
  }, 4000);

  // observer.
});

source$
  .catch((err) => Rx.Observable.of(err))
  .subscribe(
  (value) => {
    console.log('%c Emmited Value: ', 'background: #222; color: #bada55');
    console.log('>> ', value);
  },
  (err) => {
    console.log('>>>>>> ', err);
  },
  () => {
    console.log('%c Completed', 'color:green;font-weight:bold;');
  }
);
