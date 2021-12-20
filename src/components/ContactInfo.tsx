import { Fragment } from 'react';
import Contact from '../models/contact';
import './ContactInfo.css';

const ContactInfo = (props: {
  onAdd: () => void;
  onCancel: () => void;
  onDelete: (contactId: string) => void;
  contactId: string;
  contacts: Contact[];
}) => {
  const deleteClickHandler = () => {
    props.onDelete(props.contactId);
  };

  let contactInfoContent = (
    <div className={'contact-info__unselected'}>선택된 연락처가 없습니다.</div>
  );

  const contact = props.contacts.find((contact) => contact.id === props.contactId);

  if (contact) {
    contactInfoContent = (
      <Fragment key={contact!.id}>
        <dl>
          <dt>이름</dt>
          <dd>{contact!.name}</dd>
        </dl>
        <dl>
          <dt>나이</dt>
          <dd>{contact!.age}</dd>
        </dl>
        <dl>
          <dt>전화번호</dt>
          <dd>{contact!.phone}</dd>
        </dl>
        <dl>
          <dt>Email</dt>
          <dd>{contact!.email}</dd>
        </dl>
        <dl>
          <dt>설명</dt>
          <dd>{contact!.description}</dd>
        </dl>
      </Fragment>
    );
  }

  return (
    <div className={'contact-info'}>
      {contactInfoContent}
      <button
        tabIndex={-1}
        type="button"
        onClick={props.onAdd}
        className={'contact-info__add button-shape__add'}
      >
        +
      </button>
      <button
        tabIndex={-1}
        type="button"
        onClick={deleteClickHandler}
        className={'contact-info__delete button-shape__delete'}
        disabled={!props.contactId ? true : false}
      >
        -
      </button>
    </div>
  );
};

export default ContactInfo;
