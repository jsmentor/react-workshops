import $ from 'jquery';
import Rx from 'rxjs/Rx';

const output = $('.output');
const postsUl = $('ul.posts');
const posts = [{
  title: 'Post Number 1',
  body: 'This is the body of the first post'
}, {
  title: 'Post Number 2',
  body: 'This is the body of the second post'
}, {
  title: 'Post Number 3',
  body: 'This is the body of the third post'
}];

// Sets
// const postsSet = new Set(posts);
// const postsStream$ = Rx.Observable.from(postsSet);

// Maps
// const postsMap = new Map([[0, posts[0]], [1, posts[1]], [2, posts[2]]]);
// const postsStream$ = Rx.Observable.from(postsMap);

// Arrays
const postsStream$ = Rx.Observable.from(posts);


postsStream$.subscribe(
  (post) => {
    // with maps
    // post = post[1];

    console.log('Post Object: ', post);
    postsUl.append(`<li><h3>${post.title}</h3><p>${post.body}</p></li>`);
  },
  (err) => {
    console.log('Err: ', err);
  },
  () => {
    console.log('Completed!');
  }
);