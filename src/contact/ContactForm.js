
import { useEffect, useState } from 'react';
import './ContactForm.css'

const ContactForm = props => {

	const [enteredName, setEnteredName] = useState('');
	const [enteredPhone, setEnteredPhone] = useState('');
	const [enteredAge, setEnteredAge] = useState('');
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredDescription, setEnteredDescription] = useState('');

	useEffect(() => {
		console.log('rerendering');
	})

	const submitHandler = (e) => {
		e.preventDefault();
		if(enteredName.trim().length === 0 || enteredPhone.trim().length === 0 || enteredAge.trim().length === 0 || enteredEmail.trim().length === 0 || enteredDescription.trim().length === 0) {
			return;
		}
		const contactData = {
			name: enteredName,
			phone: enteredPhone,
			age: enteredAge,
			email: enteredEmail,
			description: enteredDescription
		}
		props.onAddContact(contactData);
	}

	const nameChangeHandler = (e) => {
		setEnteredName(e.target.value);
	}
	const numberChangeHandler = (e) => {
		setEnteredPhone(e.target.value);
	}
	const ageChangeHandler = (e) => {
		setEnteredAge(e.target.value);
	}
	const emailChangeHandler = (e) => {
		setEnteredEmail(e.target.value);
	}
	const descriptionChangeHandler = (e) => {
		setEnteredDescription(e.target.value);
	}

	return(
		<form onSubmit={submitHandler} className={'contact-form'}>
			<h1>연락처를 등록하세요</h1>
			<div className={'contact-form__controls'}>
				<div>
					<label>이름</label>
					<input type='text' onChange={nameChangeHandler} value={enteredName}></input>
				</div>
				<div>
					<label>전화번호</label>
					<input type='text' onChange={numberChangeHandler}></input>
				</div>
				<div>
					<label>나이</label>
					<input type='text' onChange={ageChangeHandler}></input>
				</div>
				<div>
					<label>Email</label>
					<input type='text' onChange={emailChangeHandler}></input>
				</div>
				<div>
					<label>설명</label>
					<input type='text' onChange={descriptionChangeHandler}></input>
				</div>
			</div>
			<div className={'contact-form__buttons'}>
				<button className={'contact-form__button__confirm'} type='submit'>확인</button>
				<button className={'contact-form__button__cancel'} onClick={props.onCancel} type='button'>취소</button>
			</div>
		</form>
	)
}

export default ContactForm;