import { useEffect, useState } from 'react';
import Contact from '../models/contact';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactList from './ContactList';
import './Contacts.css';
import ContactSearch from './ContactSearch';

const HEROKU_URL = 'https://contact-nestjs.herokuapp.com/contact/';
const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getContacts = async () => {
    setIsLoading(true);
    const response = await fetch(HEROKU_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'ㅎ');
    }

    setContacts(data);
    console.log(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    setIsEditing(false);
    setSelectedId('');
  }, [contacts]);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    // setSelectedContactId("");
    setIsEditing(false);
  };

  const contactClickHandler = (contactId: string) => {
    setSelectedId(contactId);
  };

  // onChangeSearchInput
  const searchChangeHandler = (enteredSearchKeyword: string) => {
    setSearchKeyword(enteredSearchKeyword);
  };

  const addContactHandler = async (enteredContactData: Contact) => {
    const contactData = { ...enteredContactData };
    const response = await fetch(HEROKU_URL, {
      method: 'POST',
      body: JSON.stringify(contactData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('add error');
    }
    setContacts([data, ...contacts]);
  };

  const deleteContactHandler = async (contactId: string) => {
    const response = await fetch(`${HEROKU_URL}${contactId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    console.log('data: ', data);

    setContacts(contacts.filter((contact) => contact.id !== data.id));
  };

  let content = <div className={'contact-section__no-data'}>연락처를 추가해주세요.</div>;

  if (contacts.length > 0) {
    content = (
      <ContactList
        searchKeyword={searchKeyword}
        contacts={contacts}
        onClick={contactClickHandler}
        contactId={selectedId}
      />
    );
  }
  if (isLoading) {
    content = <div className={'contact-section__loading'}>데이터를 가져오는 중입니다.</div>;
  }

  return (
    <div className={'contact'}>
      {!isEditing ? (
        <>
          <div className={'contact-section'}>
            <ContactSearch onSearch={searchChangeHandler} />
            {content}
          </div>
          <ContactInfo
            contactId={selectedId}
            contacts={contacts}
            onDelete={deleteContactHandler}
            onAdd={startEditingHandler}
            onCancel={stopEditingHandler}
          />
        </>
      ) : (
        <ContactForm onAddContact={addContactHandler} onCancel={stopEditingHandler} />
      )}
    </div>
  );
};

export default Contacts;
