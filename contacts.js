const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");
const shortid = require("shortid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  if (!contacts) {
    return null;
  }
  return contacts.filter((item) => parseInt(item.id) === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const itemIdx = contacts.findIndex((item) => parseInt(item.id) === contactId);
  if (itemIdx === -1) {
    return null;
  }
  const removedContacts = contacts.filter(
    (item) => parseInt(item.id) !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(removedContacts));
  return contacts[itemIdx];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newItem = {
    id: shortid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newItem);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
