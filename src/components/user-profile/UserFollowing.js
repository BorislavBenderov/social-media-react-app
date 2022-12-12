import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { UsersContainer } from "./UsersContainer";

export const UserFollowing = () => {
    const { users } = useContext(UserContext);
    const { userId } = useParams();

    const currentUser = users.find(user => user.uid === userId);
    const followingUsers = users.filter(user => currentUser.following?.includes(user.uid));

    return (
        <div className="messanger__cont">
            <section className="messanger__allusers">
                <div className="messanger__curentuser">
                    <h2>{currentUser?.displayName} following</h2>
                </div>
                {followingUsers.length > 0
                    ? followingUsers.map(user => <UsersContainer key={user.id} user={user} />)
                    : <p className="para__follow">{currentUser?.displayName} don't follow anyone!</p>}
                { }
            </section>
        </div>
    );
}