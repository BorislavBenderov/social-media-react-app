export const CommentCard = ({comment}) => {
    return (
        <div className="name__img">
            <img
                src={comment.ownerImage}
                alt=""
            />
            <p className="comment__name">{comment.ownerName}</p>
            <p className="comment">{comment.comment}</p>
        </div>
    );
}