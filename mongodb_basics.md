# MongoDB Basic Notes (Shell)

## Insert

```js
db.users.insertOne({
  name: 'wick',
  age: 33,
  skills: ['one', 'two'],
  cardDetails: {
    panCard: true,
    voterID: false,
  },
});
```

## Insert Many

```js
db.users.insertMany(
  [
    {
      name: 'wick',
      age: 33,
      skills: ['one', 'two'],
    },
    {
      name: 'john',
      age: 28,
      skills: ['three'],
    },
    {
      name: 'doe',
      age: 40,
      skills: ['four', 'five'],
    },
  ],
  { ordered: false },
  // MongoDB continues inserting even if one document fails
  // Without it, insert stops at the first error

Without it, insert stops at the first error
);
```

---

## Find

### Find all

```js
db.users.find({});
```

### Find with condition

```js
db.users.find({ age: 33 });
```

### Find one

```js
db.users.findOne({ name: 'wick' });
```

### Find using nested field

```js
db.users.find({ 'cardDetails.panCard': true });
```

### Find & send required fields

```js
db.users.find({}, { name: 1, _id: 0 });
```

---

## Update

### updateOne

```js
db.users.updateOne({ name: 'wick' }, { $set: { age: 34 } });
```

### findOneAndUpdate

```js
db.users.findOneAndUpdate(query, update, options);

db.users.findOneAndUpdate(
  { name: 'wick' },
  { $set: { age: 35 } },
  { returnNewDocument: true },
);
```

### Update nested field

```js
db.users.updateOne(
  { name: 'wick' },
  { $set: { 'cardDetails.panCard': false } },
);
```

---

## Delete

### deleteOne

```js
db.users.deleteOne({ name: 'wick' });
```

### deleteMany

```js
db.users.deleteMany({ age: { $lt: 18 } });
```

### Delete all documents

```js
db.users.deleteMany({});
```

---

## Comparison Operators

```js
$gt; // greater than
$gte; // greater than or equal
$lt; // less than
$lte; // less than or equal
```

### Examples

#### Age less than 12

```js
db.users.find({ age: { $lt: 12 } });
```

#### Age between 12 and 18

```js
db.users.find({ age: { $gt: 12, $lt: 18 } });
```

#### Age greater than or equal to 18

```js
db.users.find({ age: { $gte: 18 } });
```

---

## Update Operators

### $set

```js
db.users.updateOne({ name: 'wick' }, { $set: { age: 40 } });
```

- Updates only specified fields
- Does not remove other fields

---
