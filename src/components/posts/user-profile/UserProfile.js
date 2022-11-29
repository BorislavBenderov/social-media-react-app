import { useContext } from "react";
import { UserContext } from '../../../contexts/UserContext';
import { PostContext } from '../../../contexts/PostContext';
import { Link, useParams } from "react-router-dom";
import { Post } from "../Post";
import { Followers } from "./Followers";
import { AuthContext } from "../../../contexts/AuthContext";
import { Messages } from "./Messages";

export const UserProfile = () => {
    const { users } = useContext(UserContext);
    const { posts } = useContext(PostContext);
    const { loggedUser } = useContext(AuthContext);
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
                    <div className="name__follow__message">
                        <h3>{userProfile?.displayName}</h3>
                        {loggedUser.uid !== userProfile?.uid
                            ? <Followers userProfile={userProfile} />
                            : ''}
                        <Link to={`/messages/${userId}`}>Message</Link>
                    </div>
                    <div className="posts__followers">
                        {userPosts.length === 1
                            ? <p>{userPosts.length} post</p>
                            : <p>{userPosts.length} posts</p>}
                        {userProfile?.followers?.length === 1
                            ? <p>{userProfile?.followers.length} follower</p>
                            : <p>{userProfile?.followers.length} followers</p>}
                        <p>{userProfile?.following.length} following</p>
                    </div>
                </div>
            </div>
            {userPosts.map(post => <Post key={post.id} post={post} />)}
        </section>
    );
}