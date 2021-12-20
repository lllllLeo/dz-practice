import React from 'react';
import './ContactSearch.css';

const ContactSearch = (props: { onSearch: (keyword: string) => void }) => {
  // const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearch(e.target.value);
  };

  return (
    <div className={'contact-search'}>
      <input type="text" onChange={searchChangeHandler} placeholder={'검색어를 입력하세요'} />
    </div>
  );
};

export default ContactSearch;
