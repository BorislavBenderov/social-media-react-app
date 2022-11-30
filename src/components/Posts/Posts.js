import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { Post } from './Post';
import { AuthContext } from '../../contexts/AuthContext';

export const Posts = () => {
    const { posts } = useContext(PostContext);
    const { loggedUser } = useContext(AuthContext);
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
                        <Link to="/messages">Messages</Link>
                    </li>
                    <li>
                        <Link to="/create">Create</Link>
                    </li>
                    <li>
                        <Link to={`/profile/${loggedUser?.uid}`}>Profile</Link>
                    </li>
                    <li>
                        <Link to="#" onClick={onLogout}>Logout</Link>
                    </li>
                </ul>
            </header>
            <section className="content__container">
                {posts.map(post => <Post key={post.id} post={post} />)}
            </section>
        </main>
    );
}