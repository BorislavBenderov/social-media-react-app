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
                    <Link to="/posts">Home</Link>
                </li>
                <li>
                    <Link to="/messages">Messages</Link>
                </li>
                <li>
                    <Link to="/create">Create</Link>
                </li>
                <li>
                    <Link to={`/profile/${loggedUser?.uid}`}>Profile</Link>
                </li>
                <li>
                    <Link to="#" onClick={onLogout}>Logout</Link>
                </li>
            </ul>
        </header>
    );
}