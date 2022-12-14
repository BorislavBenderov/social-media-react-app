import { useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import { PostContext } from '../../contexts/PostContext';
import { Link, useParams } from "react-router-dom";
import { Post } from "../posts/Post";
import { Followers } from "./Followers";
import { AuthContext } from "../../contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";

export const UserProfile = () => {
    const { users } = useContext(UserContext);
    const { posts } = useContext(PostContext);
    const { loggedUser } = useContext(AuthContext);
    const { userId } = useParams();

    const userProfile = users.find(user => user.uid === userId);
    const userPosts = posts.filter(post => post.ownerId === userId);

    const combinedId = loggedUser?.uid > userProfile?.uid
        ? loggedUser?.uid + userProfile?.uid
        : userProfile?.uid + loggedUser?.uid;

    const handleSelect = async () => {
        try {
            const res = await getDoc(doc(database, 'chats', combinedId));

            if (!res.exists()) {
                await setDoc(doc(database, 'chats', combinedId), {
                    messages: []
                })
            }

        } catch (error) {
            alert(error.message);
        }
    }

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
                            ? <><Followers userProfile={userProfile} />
                                <Link className="messages__button" to={`/messages/${combinedId}`} onClick={handleSelect}>Message</Link></>
                            : <Link to={`/edit/profile/${userProfile?.uid}`}>
                                <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
                            </Link>}
                    </div>
                    <div className="posts__followers">
                        {userPosts.length === 1
                            ? <p>{userPosts?.length} post</p>
                            : <p>{userPosts?.length} posts</p>}
                        {userProfile?.followers?.length === 1
                            ? <Link to={`/followers/${userProfile?.uid}`}><p>{userProfile?.followers?.length} follower</p></Link>
                            : <Link to={`/followers/${userProfile?.uid}`}><p>{userProfile?.followers?.length} followers</p></Link>}
                        <Link to={`/following/${userProfile?.uid}`}><p>{userProfile?.following?.length} following</p></Link>
                    </div>
                    <div className="profile__description">
                        <p>{userProfile?.profileDescription}</p>
                    </div>
                </div>
            </div>
            {userPosts.map(post => <Post key={post.id} post={post} />)}
        </section>
    );
}