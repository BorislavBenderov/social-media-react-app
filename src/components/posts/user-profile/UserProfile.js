import { useContext } from "react";
import { UserContext } from '../../../contexts/UserContext';

export const UserProfile = () => {
    const { users } = useContext(UserContext);
    console.log(users);
    return (
        <div>Hello World</div>
    );
}