import { useSelector } from 'react-redux';
import ContactItem from './ContactItem';
import './ContactList.css';

const ContactList = (props) => {
  const contacts = useSelector((state) => state.contact.items);

  return (
    <ul className={'contact-list'}>
      {contacts
        .filter((contact) =>
          Object.keys(contact).some((key) =>
            key === 'id' ? false : contact[key].includes(props.searchKeyword)
          )
        )
        .map((contact) => (
          <ContactItem key={contact.id} id={contact.id} name={contact.name} phone={contact.phone} />
        ))}
    </ul>
  );
};

export default ContactList;
