import { useContext } from "react";
import { AppContext } from "../App";
import "./../scss/header.scss";

const Header = () => {
  const { setView } = useContext(AppContext);
  return (
    <header>
      <div className="title">Task Management</div>
      <div className="button">
        <button className="primary" onClick={() => setView("form")}>
          Create New Task <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
