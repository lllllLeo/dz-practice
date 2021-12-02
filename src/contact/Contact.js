import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import './Contact.css';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ContactList from './ContactList';
import ContactSearch from './ContactSearch';
// import ContactForm2 from './ContactForm2';

const HEROKU_URL = 'https://contact-nestjs.herokuapp.com/contact/'
// const DEV_URL = 'http://localhost:3001/contact/'

const Contact = () => {
	const [contacts, setContacts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedContactId, setSelectedContactId] = useState('');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const getContacts = useCallback(async () => { // getContacts가 의존하는 값이 바뀌지 않는 한 기존 함수를 반환
		setIsLoading(true);
		try {
			const response = await axios.get(HEROKU_URL)
			const data = response.data 
			setContacts(data); 
		} catch (error) {
			console.log(error.response);
			return error.response;
		}
		setIsLoading(false);
	},[])

	useEffect(() => {
		getContacts()
	},[getContacts]);

	useEffect(() => {
		setIsEditing(false);
		setSelectedContactId('');
	}, [contacts]);

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

	const addContactHandler = async (enteredContactData) => { 
		let contactData = {
			...enteredContactData
		}
		try {
			const response = await axios.post(HEROKU_URL, contactData)
			contactData = response.data;
			setContacts([contactData, ...contacts]);
		} catch (error) {
			console.log(error.response);
			return error.response;
		}
	}

	const deleteContactHandler = async (contactId) => {
		try {
			const response = await axios.delete(`${HEROKU_URL}${contactId}`)
			const deletedContact = response.data;
			setContacts(contacts.filter(contact => contact.id !== deletedContact.id))
		} catch (error) {
			console.log(error.response);
			return error.response;	
		}
	}

	let content = <div className={"contact-section__no-data"}>연락처를 추가해주세요.</div>
	
	if(contacts.length > 0) {
		content = <ContactList searchKeyword={searchKeyword} contacts={contacts} onClick={contactClickHandler}/>
	}
	if(isLoading) {
		content = <div className={"contact-section__loading"}>데이터를 가져오는 중입니다.</div>
	}

	return(
		<div className={'contact'}>
		{
			!isEditing ?
			<>
				<div className={'contact-section'}>
					<ContactSearch onSearch={searchChangeHandler} />
					{ content }
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


/* 					{!isLoading && contacts.length > 0 && <ContactList searchKeyword={searchKeyword} contacts={contacts} onClick={contactClickHandler}/> }
					{!isLoading && contacts.length === 0 && <div className={"contact-section__no-data"}>연락처를 추가해주세요.</div>}
					{isLoading && <div className={"contact-section__loading"}>데이터를 가져오는 중입니다.</div>} */

/* 
	const getContacts = async() => {
		try {
			axios.get('https://contact-nestjs.herokuapp.com/contact/').then(response => {
				return response.data
			}).then(data => {
				console.log('data', data);
				setContacts(data);
			})
		} catch (error) {
			
		}
	}

*/