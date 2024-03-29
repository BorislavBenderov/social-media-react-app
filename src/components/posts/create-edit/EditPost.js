import { doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../../../contexts/PostContext";
import { database } from "../../../firebaseConfig";

export const EditPost = () => {
  const [err, setErr] = useState("");
  const { posts } = useContext(PostContext);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentPost = posts.find((post) => post.id === postId);

  const [value, setValue] = useState({
    description: currentPost?.description,
  });

  const onEditPost = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const description = formData.get("description");

    setLoading(true);
    updateDoc(doc(database, "posts", postId), {
      description,
    })
      .then(() => {
        navigate("/posts");
        setLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Edit Post Description</h1>
        <form className="auth__form" onSubmit={onEditPost}>
          <label htmlFor="description" />
          <textarea
            className="textarea__post"
            type="text"
            placeholder="Write a description..."
            id="description"
            name="description"
            value={value.description}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">{loading ? "Loading" : "Edit"}</button>
          <p className="errors">{err}</p>
        </form>
      </div>
    </div>
  );
};
