import { useContext } from "react";
import { UserContext } from '../../../contexts/UserContext';
import { PostContext } from '../../../contexts/PostContext';
import { useParams } from "react-router-dom";

export const UserProfile = () => {
    const { users } = useContext(UserContext);
    const { posts } = useContext(PostContext);
    const { userId } = useParams();
    
    const userProfile = users.find(user => user.uid === userId);
    const userPosts = posts.filter(post => post.ownerId === userId);

    return (
        <div>Hello World</div>
    );
}