import { Link } from 'react-router-dom';
import { Comments } from './comments/Comments';

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
                <p>likes</p>
                <p>comments</p>
            </div>
            <div className="name__description">
                <h3 className="content__card__name">{post.ownerName}</h3>
                <p>{post.description}</p>
            </div>
            <Link className="view__all__comments" to={`/posts/${post.id}`}>view all comments</Link>
            <Comments postId={post.id}/>
        </div>
    );
}