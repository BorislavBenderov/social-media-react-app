import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../../contexts/PostContext";
import { UserContext } from "../../../contexts/UserContext";
import { UsersContainer } from "../../user-profile/UsersContainer";

export const PostLikes = () => {
    const { postId } = useParams();
    const { users } = useContext(UserContext);
    const { posts } = useContext(PostContext);

    const currentPost = posts.find(post => post.id === postId);
    const usersWhoLikesPost = users.filter(user => currentPost?.likes.includes(user.uid));

    return (
        <div className="messanger__cont">
            <section className="messanger__allusers">
                <div className="messanger__curentuser">
                    <h2>Liked by:</h2>
                </div>
                {usersWhoLikesPost.map(user => <UsersContainer key={user.id} user={user} />)}
            </section>
        </div>
    );
}