import { useDispatch, useSelector } from 'react-redux';
import './ContactItem.css';

const ContactItem = (props) => {
  const selectedId = useSelector((state) => state.selectedId);
  const dispatch = useDispatch();
  const contactClickHandler = () => {
    dispatch({ type: 'SET_SELECTED_ID', selectedId: props.id });
  };

  const contactItemClasses = `contact-item ${selectedId === props.id && ' selected'}`;

  return (
    <li className={contactItemClasses}>
      <button type="button" onClick={contactClickHandler} onFocus={contactClickHandler}>
        <div>{props.name}</div>
        <div>{props.phone}</div>
      </button>
    </li>
  );
};

export default ContactItem;
