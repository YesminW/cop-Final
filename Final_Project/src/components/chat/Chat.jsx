import "./chat.css";

export default function Chat() {
    const chat = {
        messages: [
            {
                id: 1,
                sender: "John Doe",
                text: "Hello",
                timestamp: new Date(),
                img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
            },
            {
                id: 2,
                sender: "Jane Smith",
                text: "Hi",
                timestamp: new Date(),
                img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
            },
            {
                id: 3,
                sender: "John Doe",
                text: "Hi",
                timestamp: new Date(),
                img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
            },
            {
                id: 4,
                sender: "Jane Smith",
                text: "Hi",
                timestamp: new Date(),
                img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
            },
            {
                id: 5,
                sender: "Jane Smith",
                text: "Hi",
                timestamp: new Date(),
                img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
            },
            {
                id: 6,
                sender: "John Doe",
                text: "Hi",
                timestamp: new Date(),
                img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
            },
            {
                id: 7,
                sender: "John Doe",
                text: "Hi",
                timestamp: new Date(),
                img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
            },
            {
                id: 8,
                sender: "Jane Smith",
                text: "Hi",
                timestamp: new Date(),
                img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
            },
            {
                id: 9,
                sender: "Jane Smith",
                text: "Hi",
                timestamp: new Date(),
                img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
            },
        ],
    };
    return (
        <div className="flex-column page-container space-between">
            <div className="chat-title">
                <img
                    className="chat-img"
                    src="https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4="
                />
                <h1 className="chat-message">צ’אט עם ההורים של אור</h1>
            </div>
            <div className="chat-content-container week-calendar-container">
                <div className="chat-messages-container">
                    {chat.messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chat-message ${
                                message.sender === "Jane Smith" && "reverse"
                            }`}
                        >
                            <img
                                className="chat-img"
                                src={message.img}
                                alt="user"
                            />
                            <div className="flex-column width-full">
                                <span className="chat-text-container chat-message-text">
                                    {message.text}
                                </span>
                                <span className="chat-message-timestamp">
                                    {message.timestamp.toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-input-container">
                    <button className="chat-send-btn">⇨</button>
                    <input
                        className="chat-input"
                        type="text"
                        placeholder="שלחו הודעה..."
                    />
                </div>
            </div>
        </div>
    );
}
