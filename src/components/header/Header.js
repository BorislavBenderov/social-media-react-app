import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";

export const Header = () => {
    const { loggedUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

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
                    <Link to="#" onClick={onLogout}>
                        <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
                    </Link>
                </li>
            </ul>
        </header>
    );
}