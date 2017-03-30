# You Might Need Flux:   

1.if your data changes over time
---
  - you don’t need Flux if you don’t care about immediately reflecting changes in the UI   

2.if you want to cache data in memory, but it can change while cached
---
  - What if the user changes an item while on the detail page, and then goes back?    
  
3.if your data is relational and models include and depend on each other
---
  - We want to do this optimistically and without waiting for server response
  - it only gets worse if entities of different types need to be updated and rolled back together.    

4.if the same data is assembled from different sources and can be rendered in several places throughout the UI
---

## The Flux solution:   
-No fat models, separate writing and reading as it gets more sophisticated.
---