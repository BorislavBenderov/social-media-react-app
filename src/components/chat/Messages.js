export const Messages = ({ message }) => {
    return (
        <div className="message">
            <img src={message.image} alt="" />
            <p>{message.message}</p>
        </div>
    );
}