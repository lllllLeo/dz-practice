import "./ContactSearch.css";

const ContactSearch = (props) => {
  const searchChangeHandler = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <div className={"contact-search"}>
      <input type="text" onChange={searchChangeHandler} placeholder={"검색어를 입력하세요"} />
    </div>
  );
};

export default ContactSearch;
