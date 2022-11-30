import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { Post } from './Post';

export const Posts = () => {
    const { posts } = useContext(PostContext);   

    return (
        <main>
            <section className="content__container">
                {posts.map(post => <Post key={post.id} post={post} />)}
            </section>
        </main>
    );
}