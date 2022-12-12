import { useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import { AuthContext } from '../../contexts/AuthContext';
import { UsersToFollow } from "./UsersToFollow";

export const Users = () => {
    const { users } = useContext(UserContext);
    const { loggedUser } = useContext(AuthContext);
    const usersToFollow = users.filter(user => !user.followers.includes(loggedUser.uid)).filter(user => user.uid !== loggedUser.uid);

    return (
        <div className="messanger__cont">
            <section className="messanger__allusers">
                <div className="messanger__curentuser">
                    <h2>Users To Follow</h2>
                </div>
                {usersToFollow.length > 0
                    ? usersToFollow.map(user => <UsersToFollow key={user.id} user={user} />)
                    : <p className="users__follow__chat">There are no users to follow!</p>}
            </section>
        </div>
    );
}