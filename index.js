const contacts = require("./contacts");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const items = await contacts.listContacts();
      console.log(items);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if (!contact.length) {
        console.log(`There is no such contact with id ${id}`);
        return;
      }
      console.log(contact);

      break;

    case "add":
      const newArr = await contacts.addContact(name, email, phone);
      console.log(newArr);
      break;

    case "remove":
      const newContacts = await contacts.removeContact(id);
      if (!newContacts) {
        console.log(`There is no such contact with id ${id}`);
        return;
      }
      console.log(newContacts);
      break;

    default:
      console.warn("Unknown action type!");
  }
};

invokeAction(argv);
