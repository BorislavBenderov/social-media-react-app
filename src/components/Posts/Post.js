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
            <p className="view__all__comments">view all comments</p>
            <div className="comment__container">
                <form>
                    <label htmlFor="comment" />
                    <input
                        type="text"
                        id="comment"
                        name="comment"
                        placeholder="Add a comment..."
                    />
                    <button>post</button>
                </form>
            </div>
        </div>
    );
}