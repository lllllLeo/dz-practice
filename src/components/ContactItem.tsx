import './ContactItem.css';

const ContactItem = (props: {
  onClick: (selectedId: string) => void;
  id?: string;
  name: string;
  phone: string;
  contactId: string;
}) => {
  const viewHandler = () => {
    props.onClick(props.id!);
  };

  const contactItemClasses = `contact-item ${props.contactId === props.id && ' selected'}`;

  return (
    <li className={contactItemClasses}>
      <button type="button" onClick={viewHandler} onFocus={viewHandler}>
        <div>{props.name}</div>
        <div>{props.phone}</div>
      </button>
    </li>
  );
};

export default ContactItem;
