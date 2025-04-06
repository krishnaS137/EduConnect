import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Icons } from "./components/ui/icons";

const Bot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);
    const messagesEndRef = useRef(null);

    const GEMINI_API_KEY = "AIzaSyDWhFONakezFbG_AmmxMzS9IZs1uTRY5h0"; // Your Gemini API key

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
        setIsSpeaking(false);
    };

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const newMessages = [...messages, { text, sender: "user" }];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            // Directly call Gemini API from frontend
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    contents: [{
                        parts: [{ 
                            text: `You are EduConnect AI, a friendly educational assistant. The user asked: "${text}". 
                                   Provide helpful educational advice, resources, or guidance in a concise manner. 
                                   Keep responses under 200 words and maintain a supportive tone.`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topP: 0.9,
                        maxOutputTokens: 1000
                    }
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            let aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
                "I couldn't generate a response. Could you please rephrase your question?";

            // Clean up response
            aiResponse = aiResponse
                .replace(/```json|```/g, "")
                .replace(/\*\*/g, "")
                .trim();

            const botMessage = { text: aiResponse, sender: "bot" };
            setMessages([...newMessages, botMessage]);
            speak(botMessage.text);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages([...newMessages, { 
                text: "Sorry, I'm having trouble connecting to the AI service. Please try again.", 
                sender: "bot" 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const speak = (text) => {
        stopSpeaking();
        const speech = new SpeechSynthesisUtterance(text);
        speech.onstart = () => setIsSpeaking(true);
        speech.onend = () => setIsSpeaking(false);
        synthRef.current.speak(speech);
        utteranceRef.current = speech;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Card className="w-full max-w-2xl shadow-xl border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                    <div className="flex items-center justify-center space-x-3">
                        <Icons.bot className="h-8 w-8" />
                        <CardTitle className="text-3xl font-bold">EduConnect Assistant</CardTitle>
                    </div>
                    <p className="text-blue-100 mt-2 text-center">
                        Your AI-powered education companion
                    </p>
                </CardHeader>
                
                <CardContent className="p-0">
                    <div className="h-96 overflow-y-auto p-6 bg-white/90">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <Icons.messageCircle className="h-12 w-12 mb-4 text-blue-200" />
                                <p className="text-lg">How can I help with your studies today?</p>
                                <p className="text-sm mt-2 text-center max-w-md">
                                    Ask about courses, assignments, or learning resources. I can explain concepts and help with your educational journey.
                                </p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 ${
                                        msg.sender === "user" 
                                            ? "bg-blue-600 text-white rounded-br-none" 
                                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                                    }`}>
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex justify-start mb-4">
                                <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3 max-w-xs">
                                    <div className="flex space-x-2">
                                        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                                        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="border-t border-gray-200 bg-white p-4">
                        <div className="flex gap-2">
                            <Input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about courses, assignments, or concepts..."
                                className="flex-grow border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-full px-4"
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                            />
                            <Button 
                                onClick={() => sendMessage(input)} 
                                className="bg-blue-600 hover:bg-blue-700 rounded-full px-6"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Icons.loader className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Icons.send className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        
                        <div className="flex justify-center gap-3 mt-3">
                            <Button 
                                onClick={startListening} 
                                variant="outline" 
                                className="rounded-full border-blue-300 text-blue-600 hover:bg-blue-50"
                                size="sm"
                            >
                                <Icons.mic className="h-4 w-4 mr-2" />
                                Speak
                            </Button>
                            <Button 
                                onClick={stopSpeaking} 
                                variant="outline" 
                                className="rounded-full border-red-300 text-red-600 hover:bg-red-50"
                                size="sm"
                                disabled={!isSpeaking}
                            >
                                <Icons.volumeX className="h-4 w-4 mr-2" />
                                Stop
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Bot;