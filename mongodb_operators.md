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

### Array

```js
// $all – array must contain all values
db.users.find({ skills: { $all: ["react", "typescript"] } });

// $size – exact array length
db.users.find({ skills: { $size: 2 } });


// $elemMatch – match object inside array
db.users.find({
  addresses: {
    $elemMatch: { city: "Pune", primary: true }
  }
});

// addresses: [
//     {
//       city: 'Pune',
//       state: 'MH',
//       primary: true
//     },
//     {
//       city: 'Mumbai',
//       state: 'MH',
//       primary: false
//     }
//   ],

// Users who do not have "java" in skills
db.users.find({ skills: { $nin: ["java"] } });

```

### Advance 

```js

// age ascending
db.users.find().sort({ age: 1 });

// age descending
db.users.find().sort({ age: -1 });


// increase age by 1
db.users.updateOne({ name: "wick" }, { $inc: { age: 1 } });

// decrease age by 2
db.users.updateOne({ name: "wick" }, { $inc: { age: -2 } });


// Updates age only if current age > 30
db.users.updateOne(
  { name: "wick" },
  { $min: { age: 30 } }
);

// $max (set only if larger)
db.users.updateOne(
  { name: "wick" },
  { $max: { age: 40 } }
);

// age = age * 2
db.users.updateOne(
  { name: "wick" },
  { $mul: { age: 2 } }
);

// $unset (remove field)
db.users.updateOne(
  { name: "wick" },
  { $unset: { cardDetails: "" } }
);
// Completely removes cardDetails


// $rename (rename field)
db.users.updateOne(
  { name: "wick" },
  { $rename: { voterID: "voterId" } }
);

// Upsert (update or insert)
db.users.updateOne(
  { name: "newUser" },
  { $set: { age: 25 } },
  { upsert: true }
);
// If user exists → update
// If not → insert new document


// $push (add value to array)
// Adds value even if it already exists
db.users.updateOne(
  { name: "wick" },
  { $push: { skills: "mongodb" } }
);


// $addToSet (add only if not exists)
// Prevents duplicates
// Acts like a Set
db.users.updateOne(
  { name: "wick" },
  { $addToSet: { skills: "mongodb" } }
);

// $pop (remove first or last element)
// remove last element
db.users.updateOne(
  { name: "wick" },
  { $pop: { skills: 1 } }
);

// remove first element
db.users.updateOne(
  { name: "wick" },
  { $pop: { skills: -1 } }
);

// $pull (remove matching value)
// Removes all matching values
db.users.updateOne(
  { name: "wick" },
  { $pull: { skills: "react" } }
);

// $pull with condition (array of objects)
// Removes objects that match condition
db.users.updateOne(
  { name: "wick" },
  { $pull: { addresses: { city: "Pune" } } }
);

```