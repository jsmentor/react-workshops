# Motivation:

More complicated single-page applications: our code must manage more state than ever before

More complex UI state: we need to manage active routes, selected tabs, spinners, pagination controls, and so on.

Managing this ever-changing state is hard.
At some point, you no longer understand what happens in your app as you have lost control over the when, why, and how of its state.

When a system is opaque and non-deterministic, it's hard to reproduce bugs or add new features.

As if this wasn't bad enough: As developers, we are expected to handle:
  - optimistic updates
  - server-side rendering
  - fetching data before performing route transitions
and so on.