import { deleteDoc, doc } from 'firebase/firestore';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../firebaseConfig';
import { Comments } from './comments/Comments';
import { Likes } from './likes/Likes';

export const Post = ({ post }) => {
    const { loggedUser } = useContext(AuthContext);

    const userOwner = post.ownerId === loggedUser.uid;

    const onDeletePost = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this post?');

        if (confirmation) {
            deleteDoc(doc(database, 'posts', post.id));
        }
    }

    return (
        <div className="content__card">
            <div className="name__img">
                <img
                    src={post.ownerImage}
                    alt=""
                />
                <Link to={`/profile/${post.ownerId}`}>
                    <h3 className="content__card__name">{post.ownerName}</h3>
                </Link>
                {userOwner
                    ? <i className="fa fa-trash fa-lg" aria-hidden="true" onClick={onDeletePost}></i>
                    : <i></i>}

            </div>
            <img
                className="content__card__img"
                src={post.image}
                alt=""
            />
            <div className="likes__coments">
                <Likes post={post} />
                <Link to={`/posts/${post.id}`}><i className="fa fa-comments-o fa-lg" aria-hidden="true"></i></Link>
            </div>
            <div className="likes__length">
                {post.likes.length > 0
                    ? <p>Liked by {post.likes.length} people</p>
                    : ''}
            </div>
            <div className="name__description">
                <h3 className="content__card__name">{post.ownerName}</h3>
                <p>{post.description}</p>
            </div>
            <Link className="view__all__comments" to={`/posts/${post.id}`}>view comments</Link>
            <Comments postId={post.id} />
        </div >
    );
}