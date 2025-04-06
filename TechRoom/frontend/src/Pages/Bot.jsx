import React, { useState, useRef } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Bot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
    };

    const startListening = () => {
        recognition.start();
    };

    const stopSpeaking = () => {
        synthRef.current.cancel();
    };

    const sendMessage = async (text) => {
        if (!text) return;

        const newMessages = [...messages, { text, sender: "user" }];
        setMessages(newMessages);

        try {
            const response = await axios.post("http://localhost:3000/chatbot", { message: text });
            const botMessage = { text: response.data.reply, sender: "bot" };
            setMessages([...newMessages, botMessage]);
            speak(botMessage.text);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
    };

    const speak = (text) => {
        stopSpeaking();
        const speech = new SpeechSynthesisUtterance(text);
        synthRef.current.speak(speech);
        utteranceRef.current = speech;
    };

    return (
        <div className="flex justify-center items-center h-screen bg-blue-100">
            <Card className="w-full max-w-md shadow-lg border-2 border-blue-300">
                <CardHeader className="bg-blue-600 text-white text-center rounded-t-lg">
                    <CardTitle className="text-xl font-bold">EduConnect Chatbot</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="h-64 overflow-y-auto border p-2 rounded bg-blue-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                                <span className={`px-3 py-1 rounded-lg inline-block ${
                                    msg.sender === "user" ? "bg-blue-400 text-white" : "bg-white border border-blue-300"
                                }`}>
                                    {msg.sender === "user" ? "You: " : "Bot: "} {msg.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                        <Input 
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything about education..."
                            className="flex-grow"
                        />
                        <Button onClick={() => sendMessage(input)} className="bg-blue-600 hover:bg-blue-700">Send</Button>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <Button onClick={startListening} className="bg-blue-500 hover:bg-blue-600">🎤 Speak</Button>
                        <Button onClick={stopSpeaking} className="bg-red-500 hover:bg-red-600">🛑 Stop</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Bot;
