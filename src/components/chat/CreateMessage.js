import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import { database, storage } from "../../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../contexts/AuthContext";

export const CreateMessage = ({ chatId, scroll }) => {
  const [input, setInput] = useState("");
  const { loggedUser } = useContext(AuthContext);

  const onCreateMessage = (e) => {
    e.preventDefault(); 

    if (input.trim() === "") return;

    updateDoc(doc(database, "chats", chatId), {
      messages: arrayUnion({
        message: input,
        id: uuidv4(),
        image: loggedUser.photoURL,
        uid: loggedUser.uid,
      }),
    })
      .then(() => {
        setInput("");
        scroll.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const onUploadFile = (e) => {
    e.preventDefault();

    const image = e.target.files[0];

    const storageRef = ref(storage, `photos/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        alert(err.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          updateDoc(doc(database, "chats", chatId), {
            messages: arrayUnion({
              message: input,
              id: uuidv4(),
              image: loggedUser.photoURL,
              uid: loggedUser.uid,
              photo: downloadUrl,
            }),
          })
            .then(() => {
              setInput("");
              scroll.current.scrollIntoView({ behavior: "smooth" });
            })
            .catch((err) => {
              alert(err.message);
            });
        });
      }
    );
  };

  return (
    <form
      onSubmit={onCreateMessage}
      onKeyDown={(e) => (e.key === "Enter" ? onCreateMessage(e) : null)}
    >
      <label htmlFor="message"></label>
      <textarea
        className="textarea"
        name="message"
        id="message"
        placeholder="Message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {!input ? (
        <>
          <label htmlFor="image">
            <i
              className="fa fa-picture-o fa-lg"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
            ></i>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => onUploadFile(e)}
          />
        </>
      ) : (
        <button className="send" type="submit">
          Send
        </button>
      )}
    </form>
  );
};
