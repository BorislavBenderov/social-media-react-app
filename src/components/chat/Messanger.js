import { useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import { AuthContext } from '../../contexts/AuthContext';
import { OtherUsers } from "./OtherUsers";

export const Messanger = () => {
    const { users } = useContext(UserContext);
    const { loggedUser } = useContext(AuthContext);
    const otherUsers = users.filter(user => user.uid !== loggedUser.uid);

    return (
        <div className="messanger__cont">
            <section className="messanger__allusers">
                <div className="messanger__curentuser">
                    <h2>{loggedUser.displayName} start chat with:</h2>
                </div>
                {otherUsers.map(user => <OtherUsers key={user.id} user={user} />)}
            </section>
        </div>
    );
}