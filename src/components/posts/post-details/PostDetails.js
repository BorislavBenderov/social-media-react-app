import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';
import { database } from "../../../firebaseConfig";
import { Comments } from "../comments/Comments";
import { CommentCard } from "../comments/CommentCard";
import { Likes } from "../likes/Likes";
import { Link } from "react-router-dom";

export const PostDetails = () => {
    const [currentPost, setCurrentPost] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        onSnapshot(doc(database, 'posts', postId), (snapshot) => {
            setCurrentPost({ ...snapshot.data(), id: snapshot.id });
        });
    }, []);

    return (
        <section className="postdetails__container">
            <div className="postdetails__image">
                <img
                    className="postdetails__img"
                    src={currentPost.image}
                    alt=""
                />
            </div>
            <div className="postdetails__card">

                <div className="name__img">
                        <img
                            src={currentPost.ownerImage}
                            alt=""
                        />
                    <Link to={`/profile/${currentPost.ownerId}`}>
                        <h3 className="content__card__name">{currentPost.ownerName}</h3>
                    </Link>
                    <Link to={'/posts'} className='details__close'>
                        <i className="fa fa-times-circle fa-lg" aria-hidden="true" style={{ color: "black" }}></i>
                    </Link>
                </div>

                <div className="name__description">
                    <p>{currentPost.description}</p>
                </div>
                <div className="comments__section">
                    {currentPost.comments?.map(comment => <CommentCard key={comment.id} comment={comment} postId={postId} />)}
                </div>
                <div className="likes__coments">
                    <Likes post={currentPost} />
                    <i className="fa fa-comments-o fa-lg" aria-hidden="true"></i>
                </div>
                <div className="likes__length">
                    {currentPost.likes?.length > 0
                        ? <p>Liked by {currentPost.likes.length} people</p>
                        : ''}
                </div>
                <Comments postId={currentPost.id} />
            </div>
        </section>
    );
}