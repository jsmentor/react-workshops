import $ from 'jquery';
import Rx from 'rxjs/Rx';

const output = $('.output');
const moveStream$ = Rx.Observable.fromEvent(document, 'mousemove');

moveStream$.subscribe(
  (e) => {
    output.text('X: ' + e.clientX + ', Y: ' + e.clientY );
  },
  (err) => {
    console.log('Err: ', err);
  },
  () => {
    console.log('Completed');
  }
);