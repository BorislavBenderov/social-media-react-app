import { useContext } from "react";
import { UserContext } from '../../../contexts/UserContext';
import { PostContext } from '../../../contexts/PostContext';
import { useParams } from "react-router-dom";
import { Post } from "../Post";

export const UserProfile = () => {
    const { users } = useContext(UserContext);
    const { posts } = useContext(PostContext);
    const { userId } = useParams();

    const userProfile = users.find(user => user.uid === userId);
    const userPosts = posts.filter(post => post.ownerId === userId);

    return (
        <section className="content__container">
            <div className="profile__info">
                <div className="profile__info__img">
                    <img src={userProfile?.image} alt="" />
                </div>
                <div className="profile__info__details">
                    <h1>{userProfile?.displayName}</h1>
                    <div className="posts__followers">
                        {userPosts.length === 1
                            ? <p>{userPosts.length} post</p>
                            : <p>{userPosts.length} posts</p>}
                    </div>
                </div>
            </div>
            {userPosts.map(post => <Post key={post.id} post={post} />)}
        </section>
    );
}