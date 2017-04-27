# Mutation and Asynchronicity:

I call them Mentos and Coke. Both can be great in separation, but together they create a mess.

React attempts to solve this problem in the view layer by removing both asynchrony and direct DOM manipulation. However:
  managing the state of your data is left up to you.
  This is where Redux enters.
  
Redux attempts to make state mutations predictable by imposing certain restrictions on how and when updates can happen.
