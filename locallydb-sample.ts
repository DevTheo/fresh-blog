import locallydb from "https://esm.sh/locallydb@0.0.9";

const db = new locallydb('./mydb');
const collection = db.collection('monsters');

/*
collection.insert([
    {name: "sphinx", mythology: "greek", eyes: 2, sex: "f", hobbies: ["riddles","sitting","being a wonder"]},
    {name: "hydra", mythology: "greek", eyes: 18, sex: "m", hobbies: ["coiling","terrorizing","growing"]},
    {name: "huldra", mythology: "norse", eyes: 2, sex: "f", hobbies: ["luring","terrorizing"]},
    {name: "cyclops", mythology: "greek", eyes: 1, sex: "m", hobbies: ["staring","terrorizing"]},
    {name: "fenrir", mythology: "norse", eyes: 2, sex: "m", hobbies: ["growing","god-killing"]},
    {name: "medusa",  mythology: "greek", eyes: 2, sex: "f", hobbies: ["coiling","staring"]}
  ]);

collection.insert({name: "HamoIzm", mythology: "amazigh", eyes: 2, sex: "m", hobbies: ["riddles","hunting"]});
  
  */

let items = collection.where({name: "HamoIzm"}).items;

console.log(items);

//collection.get(3);

items = collection.where("@eyes >= 2").items;

console.log(items);

/*
collection.where("(@eyes == 2 && @mythology == 'greek') || (@mythology == 'amazing')");

// retrieve elements creation date
collection.get(6).$created;

// retrieve elements last edit date
collection.get(6).$updated;

// List all elements in the collection
collection.items;

// Update an element, it will add un-exsited key and replace existed ($created and cid can't be changed)
collection.update(5, {eyes: 3, food:"waloo"});
collection.get(5);
=> {name: "medusa",  mythology: "greek", eyes: 3, food:"waloo", sex: "f", hobbies: ["coiling","staring"], cid:5}

// Replace the element with the same cid and $created
collection.replace(6, {car: "Ferrari"});
collection.get(6);
=> {car: "Ferrari", cid:6}

// Delete an item by cid
collection.remove(1);

// Save all to files
collection.save();

*/