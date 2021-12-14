import { useDispatch, useSelector } from 'react-redux';
import { selectedIdActions } from '../store/selectedId';
import './ContactItem.css';

const ContactItem = (props) => {
  const selectedId = useSelector((state) => state.selectedId.id);
  const dispatch = useDispatch();
  const contactClickHandler = () => {
    dispatch(selectedIdActions.setSelectedId(props.id));
  };
  const contactItemClasses = `contact-item ${selectedId === props.id && ' selected'}`;
  // FIXME: 렌더링
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
