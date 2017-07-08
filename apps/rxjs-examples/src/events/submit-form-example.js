import $ from 'jquery';
import Rx from 'rxjs/Rx';

const form = $('#sample-form');
const formStream$ = Rx.Observable.fromEvent(form, 'submit');
formStream$.subscribe(
  (e) => {
    e.preventDefault();
    console.log('FormSubmit');
  },
  (err) => {
    console.log('ERR: ', err);
  },
  () => {
    console.log('DONE');
  }
);