import { Link } from 'react-router-dom';
import { Followers } from '../user-profile/Followers';

export const UsersToFollow = ({user}) => {
    return (
        <div className="messanger__otherusers">
            <Link to={`/profile/${user.uid}`}>
                <img src={user.image} alt="" />
            </Link>
            <Link to={`/profile/${user.uid}`}>
                <h2>{user.displayName}</h2>
            </Link>
            <Followers userProfile={user}/>
        </div >
    );
}