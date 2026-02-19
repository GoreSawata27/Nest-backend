### Aggregate

## Notes

- Aggregation = data processing pipeline
- You pass documents through stages and each stage transforms data.
- documents → filter → reshape → join → group → sort → result

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

# get active user count

```js
db.users.aggregate([{ $match: { isActive: true } }, { $count: 'ActiveCount' }]);

- output : { ActiveCount: 7 }
```

# get average salary of users city-wise

```js
db.users.aggregate([
  { $match: { address: { $ne: null } } },
  {
    $group: {
      _id: '$address.city',
      avgSalary: { $avg: '$salary' },
    },
  },
]);
```

# Find users who have React skill

```js
db.users.aggregate([{ $match: { skills: 'React' } }]);
or;
db.users.aggregate([{ $match: { skills: { $in: ['React'] } } }]);
```

# Count completed projects per user

```js
db.users.aggregate([
  { $unwind: '$projects' },
  { $match: { 'projects.completed': true } },
  {
    $group: {
      _id: '$name',
      completedProjectsCount: { $sum: 1 },
    },
  },
]);
```

# Get users with missing email OR missing age

```js
db.users.aggregate([
  {
    $match: {
      $or: [{ email: null }, { age: null }],
    },
  },
]);
```
