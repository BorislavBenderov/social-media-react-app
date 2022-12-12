import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Logout } from "../auth/Logout";

export const Header = () => {
    const { loggedUser } = useContext(AuthContext);

    return (
        <header className="header__container">
            <ul className="nav">
                <li>
                    <Link to="/posts">
                        <i className="fa fa-home fa-lg" aria-hidden="true"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/messages">
                        <i className="fa fa-paper-plane fa-lg" aria-hidden="true"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/create">
                        <i className="fa fa-plus fa-lg" aria-hidden="true"></i>
                    </Link>
                </li>
                <li>
                    <Link to={`/profile/${loggedUser?.uid}`}>
                        <i className="fa fa-user fa-lg" aria-hidden="true"></i>
                    </Link>
                </li>
                <li>
                    <Logout />
                </li>
            </ul>
        </header>
    );
}