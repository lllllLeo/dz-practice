import { useState } from "react";

import ContactItem from "./ContactItem";
import "./ContactList.css";

const ContactList = (props) => {
  const [selected, setSeleted] = useState("");
  const setSelectedContactHandler = (selectedId) => {
    setSeleted(selectedId);
  };

	const a = [...props.contacts]
	console.log(a);

	// TODO: 검색결과가 없다 출력하기
  return (
    <ul className={"contact-list"}>
      {props.contacts
        .filter((contact) =>
          contact.name.indexOf(props.searchKeyword) !== -1 ||
          contact.age.indexOf(props.searchKeyword) !== -1 ||
          contact.phone.indexOf(props.searchKeyword) !== -1 ||
          contact.email.indexOf(props.searchKeyword) !== -1 ||
          contact.description.indexOf(props.searchKeyword) !== -1)
        .map((contact) => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            phone={contact.phone}
            onClick={props.onClick}
            onSelected={setSelectedContactHandler}
            selected={selected}
          />
        ))}
    </ul>
  );
};

export default ContactList;

/* 

{ props.contacts
				.filter(contact => contact.id === contacts.id)
        .map((contact) => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            phone={contact.phone}
            onClick={props.onClick}
            onSelected={setSelectedContactHandler}
            selected={selected}
          />
        ))}

{props.contacts
        .filter((contact) =>
          Object.values(contact).some((value) => value.toString().indexOf(props.searchKeyword) !== -1))
        .map((contact) => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            phone={contact.phone}
            onClick={props.onClick}
            onSelected={setSelectedContactHandler}
            selected={selected}
          />
        ))}
*/

/* 

const contacts = contactWithoutId.filter(contact => delete contact.id).filter((contact) =>
	Object.values(contact).some((value) => value.toString().indexOf(props.searchKeyword) !== -1))


*/

/* 
	const contactWithoutId = props.contacts
	const contacts = contactWithoutId.filter(contact => delete contact.id)
*/