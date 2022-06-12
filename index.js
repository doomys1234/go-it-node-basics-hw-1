const contacts = require("./contacts");
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone })=> {
  switch (action) {
    case "list":
      const items = await contacts.listContacts();
      console.log(items);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
     await contacts.addContact(name, email, phone);
      break;

    case "remove":
      const newContacts = await contacts.removeContact(id);
      console.log(newContacts);
      break;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(argv);
