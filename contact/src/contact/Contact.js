import ContactInfo from './ContactInfo';
import ContactList from './ContactList'
import ContactSearch from './ContactSearch';

import './Contact.css'
import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import { DUMMY_DATA } from '../data';

const Contact = props => {
	const [contacts, setContacts] = useState(DUMMY_DATA);
	const [selectedContactId, setSelectedContactId] = useState('');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [isEditing, setIsEditing] = useState(false);


	useEffect(() => {
		setIsEditing(false);
		setSelectedContactId('');
	},[contacts])

	const startEditingHandler = () => {
		setIsEditing(true);
	}

	const stopEditingHandler = () => {
		setIsEditing(false);
	}

	const contactClickHandler = (contactId) => {
		setSelectedContactId(contactId);
	}

	const searchChangeHandler = (enteredSearchKeyword) => {
		setSearchKeyword(enteredSearchKeyword);
	}

	const addContactHandler = enteredContactData => { 
		const contactData = {
			id: Math.round(Math.random() * 100).toString(),
			...enteredContactData
		}
		setContacts([contactData, ...contacts]);
	}

	const deleteContactHandler = (contactId) => {
		setContacts(contacts.filter(contact => contact.id !== contactId))
	}

	return(
		<div className={'contact'}>
		{
			!isEditing ?
			<>
				<div className={'contact-section'}>
					<ContactSearch onSearch={searchChangeHandler} />
					<ContactList searchKeyword={searchKeyword} contacts={contacts} onClick={contactClickHandler}/>
				</div>
				<ContactInfo
					contactId={selectedContactId} 
					contacts={contacts} 
					onDelete={deleteContactHandler} 
					onAdd={startEditingHandler} 
					onCancel={stopEditingHandler}/>
			</>
			:
			<ContactForm onAddContact={addContactHandler} onCancel={stopEditingHandler}/>
		}	
		</div>
	)
}

export default Contact;