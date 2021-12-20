import Contact from '../models/contact';
import ContactItem from './ContactItem';
import './ContactList.css';

const ContactList = (props: {
  searchKeyword: string;
  contacts: Contact[];
  onClick: (contactId: string) => void;
  contactId: string;
}) => {
  return (
    <ul className={'contact-list'}>
      {props.contacts
        .filter((contact) =>
          Object.keys(contact).some((key) =>
            key === 'id' ? false : contact[key].includes(props.searchKeyword)
          )
        )
        .map((contact) => (
          <ContactItem
            key={contact.id}
            id={contact.id}
            name={contact.name}
            phone={contact.phone}
            onClick={props.onClick}
            contactId={props.contactId}
          />
        ))}
    </ul>
  );
};

export default ContactList;
