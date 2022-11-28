import { Link } from 'react-router-dom';
import { Comments } from './comments/Comments';
import { Likes } from './likes/Likes';

export const Post = ({ post }) => {
    return (
        <div className="content__card">
            <div className="name__img">
                <img
                    src={post.ownerImage}
                    alt=""
                />
                <h3 className="content__card__name">{post.ownerName}</h3>
            </div>
            <img
                className="content__card__img"
                src={post.image}
                alt=""
            />
            <div className="likes__coments">
                <Likes post={post} />
                <Link to={`/posts/${post.id}`}><i class="fa fa-comments-o fa-lg" aria-hidden="true"></i></Link>
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
            <Link className="view__all__comments" to={`/posts/${post.id}`}>view all comments</Link>
            <Comments postId={post.id} />
        </div>
    );
}