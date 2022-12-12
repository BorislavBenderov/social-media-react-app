import { Link } from 'react-router-dom';

export const UsersContainer = ({user}) => {
    return (
        <div className="messanger__otherusers">
            <Link to={`/profile/${user.uid}`}>
                <img src={user.image} alt="" />
            </Link>
            <Link to={`/profile/${user.uid}`}>
                <h2>{user.displayName}</h2>
            </Link>
        </div >
    );
}