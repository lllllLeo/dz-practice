import React, { useEffect, useRef } from 'react';
import Contact from '../models/contact';
import './ContactForm.css';

// model에 있는데 여기선 id가 없으니까 에러떠서 임시로 type 객체그냥만듦 보통어케하는지
// 아니면 model id를 || 써서해야하나 ->  일단 ?로 함
// type ContactType = {
//   name: string;
//   email: string;
//   age: string;
//   phone: string;
//   description: string | undefined;
// };

const ContactForm = (props: {
  onAddContact: (contactData: Contact) => void;
  onCancel: () => void;
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('rerendering');
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredName = nameInputRef.current!.value;
    const enteredPhone = phoneInputRef.current!.value;
    const enteredAge = ageInputRef.current!.value;
    const enteredEmail = emailInputRef.current!.value;
    const enteredDescription = descriptionInputRef.current!.value;

    if (
      enteredName.trim().length === 0 ||
      enteredPhone.trim().length === 0 ||
      enteredAge.trim().length === 0 ||
      enteredEmail.trim().length === 0 ||
      enteredDescription.trim().length === 0
    ) {
      return;
    }
    const contactData = {
      name: enteredName,
      phone: enteredPhone,
      age: enteredAge,
      email: enteredEmail,
      description: enteredDescription,
    };
    props.onAddContact(contactData);
  };

  return (
    <form onSubmit={submitHandler} className={'contact-form'}>
      <h1>연락처를 등록하세요</h1>
      <div className={'contact-form__controls'}>
        <div>
          <label>이름</label>
          <input ref={nameInputRef} type="text"></input>
        </div>
        <div>
          <label>전화번호</label>
          <input ref={phoneInputRef} type="text"></input>
        </div>
        <div>
          <label>나이</label>
          <input ref={ageInputRef} type="text"></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef} type="text"></input>
        </div>
        <div>
          <label>설명</label>
          <input ref={descriptionInputRef} type="text"></input>
        </div>
      </div>
      <div className={'contact-form__buttons'}>
        <button className={'contact-form__button__confirm'} type="submit">
          확인
        </button>
        <button className={'contact-form__button__cancel'} onClick={props.onCancel} type="button">
          취소
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
