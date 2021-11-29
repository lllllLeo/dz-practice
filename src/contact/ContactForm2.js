
import { useEffect, useRef } from 'react';
import './ContactForm.css'

const ContactForm2 = props => {

	const nameInputRef = useRef();
	const phoneInputRef = useRef();
	const ageInputRef = useRef();
	const emailInputRef = useRef();
	const descriptionInputRef = useRef();

	useEffect(() => {
		console.log('rerendering');
	})

	const submitHandler = (e) => {
		e.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredPhone = phoneInputRef.current.value;
		const enteredAge = ageInputRef.current.value;
		const enteredEmail = emailInputRef.current.value;
		const enteredDescription = descriptionInputRef.current.value;

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

	return(
		<form onSubmit={submitHandler} className={'contact-form'}>
			<h1>연락처를 등록하세요</h1>
			<div className={'contact-form__controls'}>
				<div>
					<label>이름</label>
					<input ref={nameInputRef} type='text'></input>
				</div>
				<div>
					<label>전화번호</label>
					<input ref={phoneInputRef} type='text'></input>
				</div>
				<div>
					<label>나이</label>
					<input ref={ageInputRef} type='text'></input>
				</div>
				<div>
					<label>Email</label>
					<input ref={emailInputRef} type='text'></input>
				</div>
				<div>
					<label>설명</label>
					<input ref={descriptionInputRef} type='text'></input>
				</div>
			</div>
			<div className={'contact-form__buttons'}>
				<button className={'contact-form__button__confirm'} type='submit'>확인</button>
				<button className={'contact-form__button__cancel'} onClick={props.onCancel} type='button'>취소</button>
			</div>
		</form>
	)
}

export default ContactForm2;