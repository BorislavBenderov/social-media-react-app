import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database, storage } from "../../../firebaseConfig";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

export const CreatePost = () => {
  const [err, setErr] = useState("");
  const [isFileAdd, setIsFileAdd] = useState(false);
  const { loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onCreate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const image = formData.get("image");
    const description = formData.get("description");

    if (image.name === "") {
      setErr("Please add a file!");
      return;
    }
    setLoading(true);
    const storageRef = ref(storage, `/posts/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        setErr(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const postData = {
            description,
            image: downloadURL,
            timestamp: serverTimestamp(),
            ownerId: loggedUser.uid,
            likes: [],
          };
          addDoc(collection(database, "posts"), postData)
            .then(() => {
              setLoading(false);
              navigate("/posts");
            })
            .catch((err) => {
              setErr(err.message);
              setLoading(false);
            });
        });
      }
    );
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Create New Post</h1>
        <form className="auth__form" onSubmit={onCreate}>
          <label htmlFor="description" />
          <textarea
            className="textarea__post"
            type="text"
            placeholder="Write a description..."
            id="description"
            name="description"
          />
          <label htmlFor="image">
            <i
              className="fa fa-picture-o fa-lg"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
            >
              {isFileAdd ? "File is added!" : "Add a file"}
            </i>
          </label>
          <input
            type="file"
            placeholder="Choose a picture"
            id="image"
            name="image"
            onChange={() => setIsFileAdd(true)}
          />
          <p className="errors">{err}</p>
          <button type="submit">{loading ? 'Loading...': 'Create'}</button>
        </form>
      </div>
    </div>
  );
};
