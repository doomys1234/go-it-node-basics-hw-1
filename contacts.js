const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(data.toString()))
    .then((error) => console.log(error));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const arr = JSON.parse(data);
      return arr.filter((item) => parseInt(item.id) === contactId);
    })
    .then((error) => console.log(error));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const arr = JSON.parse(data);
      return arr.filter((item) => parseInt(item.id) !== contactId);
    })
    .then((error) => console.log(error));
}

function addContact(id, name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const arr = JSON.parse(data);
      const newItem = {
        id: arr.length + 1,
        name: name,
        email: email,
        phone: phone,
      };
      arr.push(newItem);
      fs.writeFile(contactsPath, JSON.stringify(arr), (err) => {
        if (err) {
          console.log(err);
        }
      });
    })
    .catch((error) => console.log(error)); 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
