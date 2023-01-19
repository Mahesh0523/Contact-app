import { useEffect, useState } from "react";
import "./App.css";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const removeContact = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: contacts.length, ...contact }]);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <ContactList contacts={contacts} getContactId={removeContact} />
            )}
          />
          <Route
            path="/add"
            component={(props) => (
              <AddContact {...props} addContact={addContactHandler} />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
