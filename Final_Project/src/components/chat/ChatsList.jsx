import EfooterS from "../../Elements/EfooterS";
import "./chat.css";
export default function ChatsList() {
    const chats = [
        {
            id: 1,
            text: "צ’אט עם ההורים של אור",
            img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
        },

        {
            id: 2,
            text: "צ’אט עם ההורים של אור",
            img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
        },
        {
            id: 3,
            text: "צ’אט עם ההורים של אור",
            img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
        },
        {
            id: 4,
            text: "צ’אט עם ההורים של אור",
            img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
        },
        {
            id: 5,
            text: "צ’אט עם ההורים של אור",
            img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
        },
        {
            id: 6,
            text: "צ’אט עם ההורים של אור",
            img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
        },
        {
            id: 7,
            text: "צ’אט עם ההורים של אור",
            img: "https://media.istockphoto.com/id/1353379172/photo/cute-little-african-american-girl-looking-at-camera.jpg?s=612x612&w=0&k=20&c=RCOYytwS2nMGfEb80oyeiCcIiqMQu6wnTluAaxMBye4=",
        },
    ];
    return (
        <div className="page-container">
            <h1 className="chat-title">עם מי נדבר?</h1>
            <div className="chats-list-container week-calendar-container">
                {chats.map((chat) => (
                    <div key={chat.id} className="chat-container">
                        <img
                            className="chat-img"
                            src={chat.img}
                            alt={chat.name}
                        />
                        <h3 className="chat-text-container">{chat.text}</h3>
                    </div>
                ))}
            </div>
            {EfooterS}
        </div>
    );
}
