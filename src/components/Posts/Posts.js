import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { PostContext } from '../../contexts/PostContext';
import { UserContext } from '../../contexts/UserContext';
import { Post } from './Post';

export const Posts = () => {
    const { posts } = useContext(PostContext);
    const { users } = useContext(UserContext);
    const { loggedUser } = useContext(AuthContext);
    const currentUsersPosts = posts.filter(post => post.ownerId === loggedUser.uid);
    const followedUsers = users.filter(user => user.followers.includes(loggedUser.uid));
    const followedUsersPosts = posts.filter(post => followedUsers.find(user => user.uid === post.ownerId)).concat(currentUsersPosts);

    return (
        <main>
            <section className="content__container">
                {followedUsersPosts.length > 0
                    ? followedUsersPosts.map(post => <Post key={post.id} post={post} />)
                    : <div className='no__posts__show'>
                        <p>There are no posts to show.</p>
                        <p>Start follow users!</p>
                        <Link to='/users'>
                            <p>Click Here!</p>
                            <i className="fa fa-users fa-lg" aria-hidden="true"></i>
                        </Link>
                    </div>}
            </section>
        </main>
    );
}