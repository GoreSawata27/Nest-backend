### Aggregate

## Notes

- $match → $unwind → $group → $project → $sort → $skip → $limit
- aggregate() = read + transform , → view data
- updateOne / updateMany = write + change DB , → change data

```js
// Groups users by age
// For each age, collects all name values into an array

db.users.aggregate([
  {
    $group: {
      _id: '$age',
      names: { $push: '$name' },
    },
  },
]);
```

```js
[
  { _id: 25, names: ['gore', 'john'] },
  { _id: 34, names: ['wick'] },
  { _id: 99, names: ['one'] },
];
```

```js
// $$ROOT = entire current document
db.users.aggregate([
  {
    $group: {
      _id: '$age',
      users: { $push: '$$ROOT' },
    },
  },
]);
```

```js
db.users.aggregate([{ $match: { age: { $gte: 18 } } }]);
```

```js
- $project is an aggregation stage used to control the output shape of documents.

db.users.aggregate([
  { $match: { age: { $gte: 18 } } },
  {
    $group: {
      _id: '$age',
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      age: '$_id',
      count: 1,
      _id: 0,
    },
  },
]);

```

```js
- Break array into multiple documents.

db.users.aggregate([
  { $unwind: '$skills' },
  {
    $group: {
      _id: '$skills',
      count: { $sum: 1 },
    },
  },
]);
```

```js
db.users.aggregate([
  { $match: { age: { $gte: 18 } } },
  { $count: 'adultCount' },
]);

// {
//   adultCount: 9
// }
```
