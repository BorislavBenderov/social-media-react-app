import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export const Posts = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            })
    }

    return (
        <main>
            <header className="header__container">
                <ul className="nav">
                    <li>
                        <a href="">Create</a>
                    </li>
                    <li>
                        <a href="">Profile</a>
                    </li>
                    <li>
                        <Link to="#" onClick={onLogout}>Logout</Link>
                    </li>
                </ul>
            </header>
            <section className="content__container">
                <div className="content__card">
                    <div className="name__img">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="img"
                        />
                        <h3 className="content__card__name">Borislav</h3>
                    </div>
                    <img
                        className="content__card__img"
                        src="https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg"
                        alt=""
                    />
                    <div className="likes__coments">
                        <p>likes</p>
                        <p>comments</p>
                    </div>
                    <div className="name__description">
                        <h3 className="content__card__name">Borislav</h3>
                        <p>Lorem, ipsum dolor sit </p>
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
                <div className="content__card">
                    <div className="name__img">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="img"
                        />
                        <h3 className="content__card__name">Borislav</h3>
                    </div>
                    <img
                        className="content__card__img"
                        src="https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg"
                        alt=""
                    />
                    <div className="likes__coments">
                        <p>likes</p>
                        <p>comments</p>
                    </div>
                    <div className="name__description">
                        <h3 className="content__card__name">Borislav</h3>
                        <p>Lorem, ipsum dolor sit </p>
                    </div>
                    <p>view all comments</p>
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
            </section>
        </main>

    );
}