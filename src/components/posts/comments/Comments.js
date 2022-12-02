import { orderBy, query, collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { database } from '../../../firebaseConfig';
import { CommentCard } from './CommentCard';

export const Comments = ({ currentPost }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const q = query(collection(database, 'comments'), orderBy('timestamp'));
        onSnapshot(q, (querySnapshot) => {
            setComments(querySnapshot.docs.map(item => {
                return { ...item.data(), id: item.id }
            }));
        });
    }, []);

    const currentPostComments = comments.filter(comment => comment.commentId === currentPost.id);

    return (
        <div className="comments__section">
            {currentPostComments?.map(comment => <CommentCard key={comment.id} comment={comment} />)}
        </div>
    );
}