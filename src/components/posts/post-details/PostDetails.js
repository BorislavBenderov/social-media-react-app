import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';
import { database } from "../../../firebaseConfig";
import { Comments } from "../comments/Comments";
import { CommentCard } from "../comments/CommentCard";
import { Likes } from "../likes/Likes";

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
                    <h3 className="content__card__name">{currentPost.ownerName}</h3>
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