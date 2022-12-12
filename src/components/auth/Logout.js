import { auth } from "../../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";

export const Logout = () => {
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
        <Link to="#" onClick={onLogout}>
            <i className="fa fa-sign-out fa-lg" aria-hidden="true"></i>
        </Link>
    );
}