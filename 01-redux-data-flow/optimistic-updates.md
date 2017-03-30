## How hard it is to handle: optimistic updates

We want to do this optimistically and without waiting for server response. This means:
we first update the object, then send a request to the server,
and if it fails, we roll back both the counters and the flags. Simple huh?   

We can implement this as a method on a model, but this means one of them will be managed by another one.
Such indirection makes bugs trickier to track, and
__it only gets worse if entities of different types need to be updated and rolled back together.__

### A Simple solution

1. dispatch an action to store the current state of the object in the store
2. dispatch an action to update the object
3. dispatch an action to update a sync flag to false which means the data is not synced (optional)
4. Send the request and wait for the response:   
  a. __success:__ dispath an action to set the sync flag to true (optional)   
  b. __failure:__ roll back by dispatching an action which stores the saved state of the object(from step 1)   
  c. __default (if it succeeds or fails):__ dispatch an action to empty the attribute which has the current state of the object in store   
