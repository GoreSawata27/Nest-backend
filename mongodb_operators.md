### Operators

### Comparison Operators

```js
// $eq (equal)
db.users.find({ age: { $eq: 30 } });

// $ne (not equal)
db.users.find({ age: { $ne: 30 } });

// $lt (less than)
db.users.find({ age: { $lt: 18 } });

// $gt (greater than)
db.users.find({ age: { $gt: 25 } });

// $lte (less than or equal)
db.users.find({ age: { $lte: 60 } });

// $gte (greater than or equal)
db.users.find({ age: { $gte: 18 } });

// $in (value in list)
db.users.find({ age: { $in: [18, 21, 25] } });

// $nin (value not in list)
db.users.find({ age: { $nin: [18, 21, 25] } });
```

### Logical Operators

```js
// $not (NOT condition)
db.users.find({ age: { $not: { $gt: 18 } } });

// $and (ALL conditions must be true)
db.users.find({ $and: [{ age: { $gte: 18 } }, { age: { $lte: 30 } }] });

// $or (ANY condition can be true)
db.users.find({ $or: [{ age: { $lt: 18 } }, { age: { $gt: 60 } }] });

// $nor (NONE of the conditions should be true)
db.users.find({ $nor: [{ age: { $lt: 18 } }, { age: { $gt: 60 } }] });
```

```js
// $exists (field exists or not)
db.users.find({ cardDetails: { $exists: true } });

// $exists false
db.users.find({ cardDetails: { $exists: false } });

// $type (check data type)
db.users.find({ age: { $type: 'number' } });

// $type with array
db.users.find({ skills: { $type: 'array' } });

// $type with object
db.users.find({ cardDetails: { $type: 'object' } });
```
