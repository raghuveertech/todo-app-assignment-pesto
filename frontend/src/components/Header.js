import "./../scss/header.scss";

const Header = () => {
  return (
    <header>
      <div className="title">Task Management</div>
      <div className="button">
        <button className="primary">
          Create New Task <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
