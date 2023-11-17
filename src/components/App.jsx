import React, { Component } from 'react';
import { customAlphabet } from 'nanoid';
import { PhonebookForm } from './Phonebook/Form/Form';
import Filter from './Phonebook/Filter/Filter';
import Contacts from './Phonebook/Contact/Contacts';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contacts)
   
    if(parsedContact){
      this.setState({contacts:parsedContact})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevProps.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  saveNewContact = ({ name, number }) => {
    const nanoid = customAlphabet('1234567890abcdef', 10);
    let id = nanoid(5);

    this.setState(prevState => {
      const newContact = {
        id,
        name,
        number,
      };
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  onFilterName = evt => {
    const dataContacts = this.state.contacts;
    const filterInputValue = this.state.filter;

    const filterName = dataContacts.filter(({ name }) => {
      return name.toLowerCase().includes(filterInputValue.toLowerCase());
    });

    return filterName;
  };

  deleteContact = id => {
    this.setState(prevState => {
      return { contacts: prevState.contacts.filter(item => item.id !== id) };
    });
  };

  render() {
    console.log('App render');
    const filteredContacts = this.onFilterName();

    return (
      <>
        <PhonebookForm state={this.state} onSubmit={this.saveNewContact} />
        <Filter state={this.state} onChange={this.handleChange} />
        <Contacts data={filteredContacts} deleteContact={this.deleteContact} />
      </>
    );
  }
}

export default App;
