## Iterating over Keys of an Object.

https://jsperf.com/object-keys-vs-for-in-with-closure/3 implies that `Object.keys` is the fastest way of iterating
over properties of an object.

```
for (var i = 0, keys = Object.keys(obj); i < keys.length; i++) {
  const key = keys[i];
}
```
