# MongoDB Schema Validation (Notes)

MongoDB is schema-less by default, but schema validation allows enforcing rules using JSON Schema.

---

## Why Schema Validation?

- Prevent invalid data
- Enforce required fields
- Enforce data types
- Add safety at database level

---

## Create Collection with Validation

```js
db.createCollection('nonfiction', {
  validator: {
    $jsonSchema: {
      required: ['name', 'price'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'must be a string and required',
        },
        price: {
          bsonType: 'number',
          description: 'must be a number and required',
        },
      },
    },
  },
  validationAction: 'error',
});
```

---

## Important Keywords

### validator

Defines validation rules

### $jsonSchema

MongoDB specific JSON Schema format

### required

Fields that must exist

```js
required: ['name', 'price'];
```

---

## bsonType

MongoDB uses bsonType instead of type

Common values:

```js
string;
number;
int;
double;
bool;
array;
object;
date;
objectId;
```

---

## validationAction

### error

Rejects invalid insert/update

### warn

Allows write but logs warning

---

## Valid Insert

```js
db.nonfiction.insertOne({
  name: 'Atomic Habits',
  price: 499,
});
```

---

## Invalid Inserts

Missing required field:

```js
db.nonfiction.insertOne({
  name: 'Atomic Habits',
});
```

Wrong type:

```js
db.nonfiction.insertOne({
  name: 'Atomic Habits',
  price: 'free',
});
```

---

## Modify Existing Collection

```js
db.runCommand({
  collMod: 'nonfiction',
  validator: {
    $jsonSchema: {
      required: ['name', 'price'],
      properties: {
        name: { bsonType: 'string' },
        price: { bsonType: 'number' },
      },
    },
  },
  validationAction: 'error',
});
```

---

## Nested Object Validation

```js
cardDetails: {
  bsonType: "object",
  required: ["panCard"],
  properties: {
    panCard: { bsonType: "bool" },
    voterID: { bsonType: "bool" }
  }
}
```

---

## Array Validation

```js
skills: {
  bsonType: "array",
  items: {
    bsonType: "string"
  }
}
```

---

## Key Rules

- Applies to insert and update
- Existing data is not auto-fixed
- Uses bsonType only
- Runs before write

---

## Summary

Schema validation gives MongoDB structure without losing flexibility.
