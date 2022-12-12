import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { UsersContainer } from "./UsersContainer";

export const UserFollowers = () => {
    const { users } = useContext(UserContext);
    const { userId } = useParams();

    const currentUser = users.find(user => user.uid === userId);
    const followedUsers = users.filter(user => currentUser.followers.includes(user.uid));

    return (
        <div className="messanger__cont">
            <section className="messanger__allusers">
                <div className="messanger__curentuser">
                    <h2>{currentUser?.displayName} followers</h2>
                </div>
                {followedUsers.length > 0
                    ? followedUsers.map(user => <UsersContainer key={user.id} user={user} />)
                    : <p className="para__follow">No followers to show!</p>}
            </section>
        </div>
    );
}