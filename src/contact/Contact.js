import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import "./Contact.css";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactList from "./ContactList";
import ContactSearch from "./ContactSearch";
// import ContactForm2 from './ContactForm2';

/* 

최대한 const쓰려고함. let 할당할당하면 맨마지막까지 봐야하는느낌. 변하는거까지봐야함.
aaa && 이런거할때 필요없는 확인은 안해도 될듯
handleChange... handlerChangeKeyword
외부로 버블링하는 이벤트면 on으로
하나 클릭하고 Tab하면 검은테두리 포커스?가 움직임 고쳐야함  onCLick x

promise보다 async쓸거같고 일반보다 화살표쓰는게좋을거같다. 대신 어떤건지알고 프로젝트 상황에 맞춰서 사용해라
*/
const HEROKU_URL = "https://contact-nestjs.herokuapp.com/contact/";
// const DEV_URL = 'http://localhost:3001/contact/'

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const getContacts = async () => {
    console.log("getContacts");
    // getContacts가 의존하는 값이 바뀌지 않는 한 기존 함수를 반환
    setIsLoading(true);
    try {
      const response = await axios.get(HEROKU_URL);
      const data = response.data;
      setContacts(data);
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    setIsEditing(false);
    setSelectedContactId(""); // 무조건 하는건 아님  나는 어떻게 구현할건지 생각하고
  }, [contacts]);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    // setSelectedContactId("");
    setIsEditing(false);
  };

  const contactClickHandler = (contactId) => {
    setSelectedContactId(contactId);
  };

  // onChangeSearchInput
  const searchChangeHandler = (enteredSearchKeyword) => {
    setSearchKeyword(enteredSearchKeyword);
  };

  const addContactHandler = async (enteredContactData) => {
    // const
    let contactData = {
      ...enteredContactData,
    };
    try {
      const response = await axios.post(HEROKU_URL, contactData);
      contactData = response.data;
      setContacts([contactData, ...contacts]);
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  const deleteContactHandler = async (contactId) => {
    try {
      const response = await axios.delete(`${HEROKU_URL}${contactId}`);
      const deletedContact = response.data;
      setContacts(contacts.filter((contact) => contact.id !== deletedContact.id));
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  let content = <div className={"contact-section__no-data"}>연락처를 추가해주세요.</div>;

  if (contacts.length > 0) {
    content = (
      <ContactList
        searchKeyword={searchKeyword}
        contacts={contacts}
        onClick={contactClickHandler}
        contactId={selectedContactId}
      />
    );
  }
  if (isLoading) {
    content = <div className={"contact-section__loading"}>데이터를 가져오는 중입니다.</div>;
  }

  return (
    <div className={"contact"}>
      {!isEditing ? (
        <>
          <div className={"contact-section"}>
            <ContactSearch onSearch={searchChangeHandler} />
            {content}
          </div>
          <ContactInfo
            contactId={selectedContactId}
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
