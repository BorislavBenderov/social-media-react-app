import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { Post } from './Post';

export const Posts = () => {
    const { posts } = useContext(PostContext);
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
                        <Link to="/create">Create</Link>
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
                {posts.map(post => <Post key={post.id} post={post}/>)}
            </section>
        </main>

    );
}