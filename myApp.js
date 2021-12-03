require('dotenv').config();
const mongoose = require('mongoose');
const URI = 'mongodb+srv://user:user@cs355-nosql-sr.3j1n9.mongodb.net/CS355-NoSQL-SR?retryWrites=true&w=majority'
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  var lillysmith = new Person({
    name: "Billy Bob",
    age: 65,
    favoriteFoods: ["oats", "wheat", "cake"]
  })
  lillysmith.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Jimmy", age: 95, favoriteFoods: ["Green eggs and ham"]},
  {name: "Tom", age: 56, favoriteFoods: ["Turkey"]},
  {name: "Alex", age: 10, favoriteFoods: ["Candy"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, Person) {
    if (err) return console.log(err);
    Person.favoriteFoods.push(foodToAdd);
    Person.save((err, updatedPerson) => {
        if(err) return console.log(err);
        done(null, updatedPerson)
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) => {
      if (err) return done(err);
      done(null, data);
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

 const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    })
  };
/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
