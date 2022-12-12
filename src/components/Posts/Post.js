import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';
import { CreateComment } from './comments/CreateComment';
import { DeletePost } from './create-edit/DeletePost';
import { Likes } from './likes/Likes';

export const Post = ({ post }) => {
    const { loggedUser } = useContext(AuthContext);
    const { users } = useContext(UserContext);

    const userOwner = post.ownerId === loggedUser.uid;
    const userInfo = users.find(user => user.uid === post.ownerId);

    return (
        <div className="content__card">
            <div className="name__img">
                <img
                    src={userInfo?.image}
                    alt=""
                />
                <Link to={`/profile/${post.ownerId}`}>
                    <h3 className="content__card__name">{userInfo?.displayName}</h3>
                </Link>
                {userOwner
                    ? <>
                        <Link to={`/edit/posts/${post.id}`}>
                            <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
                        </Link>
                        <DeletePost postId={post.id}/>
                    </>
                    : <>
                        <i></i>
                        <i></i>
                    </>
                }
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
                {post.likes?.length > 0
                    ? <Link to={`/likes/${post.id}`}><p>Liked by {post.likes.length} people</p></Link>
                    : ''}
            </div>
            <div className="name__description">
                <h3 className="content__card__name">{userInfo?.displayName}</h3>
                <p>{post.description}</p>
            </div>
            <Link className="view__all__comments" to={`/posts/${post.id}`}>view comments</Link>
            <CreateComment postId={post.id} />
        </div >
    );
}