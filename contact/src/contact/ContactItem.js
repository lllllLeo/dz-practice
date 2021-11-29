
import './ContactItem.css';

const ContactItem = props => {
	const viewHandler = () => {
		props.onClick(props.id);
		props.onSelected(props.id)
	}	

	return (
		<li className={`contact-item ${props.selected === props.id ? ' selected' : '' }`}>
				<button type='button' onClick={viewHandler}>
					<div>{props.name}</div>
					<div>{props.phone}</div>
				</button>
		</li>
	)
}

export default ContactItem;