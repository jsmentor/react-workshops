import $ from 'jquery';
import Rx from 'rxjs/Rx';

const input = $('input[name=fullname]');
const output = $('.output');
const inputStream$ = Rx.Observable.fromEvent(input, 'keyup');
inputStream$.subscribe(
  (e) => {
    output.text(e.target.value);
  },
  (err) => {
    console.log('ERR: ', err);
  },
  () => {
    console.log('DONE');
  }
);