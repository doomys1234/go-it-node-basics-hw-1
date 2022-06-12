const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");
const shortid = require("shortid")

const listContacts = async() => {
  const data = await fs.readFile(contactsPath)
  const items = data.toString()
  return items
}

const getContactById = async (contactId) => {
  const data = await listContacts()
  const contacts = JSON.parse(data)
  if (!contacts) {
    return null
  }
  return contacts.filter(item => parseInt(item.id) === contactId); 

}

const removeContact = async(contactId)=>{
  const data = await listContacts()
  const contacts = JSON.parse(data)
  if (!contacts) {
    return null
  }
  return contacts.filter(item => parseInt(item.id) !== contactId); 
}

const addContact = async(name, email, phone) =>{

  const data = await listContacts()
  const contacts = JSON.parse(data)
  const newItem = {
        id: shortid(),
        name: name,
        email: email,
        phone: phone,
  };
  contacts.push(newItem)
  const newContacts = await fs.writeFile(contactsPath,JSON.stringify(contacts))
  return newContacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
