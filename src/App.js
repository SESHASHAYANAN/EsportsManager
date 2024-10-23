import React, { useState } from "react";
import {
  MessageCircle,
  Users,
  Trophy,
  Calendar,
  Hotel,
  PlusCircle,
  Menu,
  X,
  Send,
  Gamepad2,
  Sword,
  Lightbulb,
  Users2,
  UserCircle,
} from "lucide-react";
import "./styles.css";

const Dashboard = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "General Chat",
      messages: [],
      type: "general",
    },
  ]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("chat");
  const [isLoading, setIsLoading] = useState(false);

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const createSpecializedChat = (type) => {
    const existingChat = chats.find((chat) => chat.type === type);
    if (existingChat) {
      setActiveChatId(existingChat.id);
      return;
    }

    const titles = {
      players: "Player Management Chat",
      matches: "Match Discussion",
      schedule: "Schedule Assistant",
      accommodation: "Accommodation Helper",
      gameplan: "Strategic Game Planning",
      enemies: "Know Your Enemies",
      tricks: "Tricks & Tips",
      teamprofile: "Team Profile",
      profile: "Personal Profile",
    };

    const newChat = {
      id: chats.length + 1,
      title: titles[type],
      messages: [],
      type: type,
    };

    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  };

  const createNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      title: `New Chat ${chats.length + 1}`,
      messages: [],
      type: "general",
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  };

  const handleSend = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const newMessage = {
      text: currentMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    setCurrentMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responseText = getResponseByType(activeChat.type);
      const aiResponse = {
        text: responseText,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, aiResponse] }
            : chat
        )
      );

      setIsLoading(false);
    }, 1000);
  };

  const getResponseByType = (type) => {
    const responses = {
      players:
        "I can help you with player management. What would you like to know about the team roster?",
      matches:
        "I can provide information about matches. Would you like to discuss recent games or upcoming matches?",
      schedule:
        "I can assist with scheduling. Would you like to view or modify the team's schedule?",
      accommodation:
        "I can help with accommodation arrangements. What information do you need?",
      gameplan:
        "Let's develop a winning strategy. Tell me about your opponents and I'll help create a tailored game plan. Would you like to focus on attack or defense strategies?",
      enemies:
        "I can analyze your opponents' strengths and weaknesses. Which team would you like to learn more about? I can provide insights on their preferred agents, strategies, and past performance.",
      tricks:
        "I can share advanced tips and weapon strategies. Would you like to learn about specific agent abilities, weapon mechanics, or map-specific tactics?",
      teamprofile:
        "I can provide detailed information about your team's performance, strengths, and areas for improvement. What specific aspect would you like to explore?",
      profile:
        "I'm here to help you improve as a player. Would you like to focus on aim training, game sense, communication, or specific agent mastery?",
      general: "How can I assist you with VALORANT Esports team management?",
    };
    return responses[type] || responses.general;
  };

  const handleTabSelect = (tabId) => {
    setSelectedTab(tabId);
    createSpecializedChat(tabId);
  };

  return (
    <div className="container">
      <div
        className={`sidebar ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={createNewChat}>
            <PlusCircle size={20} />
            <span>New Chat</span>
          </button>
        </div>

        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`chat-item ${
                activeChatId === chat.id ? "active" : ""
              }`}
            >
              {chat.title}
            </div>
          ))}
        </div>

        <div className="sidebar-nav">
          {[
            { id: "players", icon: Users, label: "Players" },
            { id: "matches", icon: Trophy, label: "Matches" },
            { id: "schedule", icon: Calendar, label: "Schedule" },
            { id: "accommodation", icon: Hotel, label: "Accommodation" },
            { id: "gameplan", icon: Gamepad2, label: "Game Plan" },
            { id: "enemies", icon: Sword, label: "Know Your Enemies" },
            { id: "tricks", icon: Lightbulb, label: "Tricks and Tips" },
            { id: "teamprofile", icon: Users2, label: "Team Profile" },
            { id: "profile", icon: UserCircle, label: "Profile" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSelect(item.id)}
                className={`nav-button ${
                  selectedTab === item.id ? "active" : ""
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <button
            className="menu-button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="title">
            {activeChat?.title || "VALORANT Esports Team Management"}
          </h1>
        </div>

        <div className="chat-container">
          <div className="messages-container">
            {activeChat?.messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="message ai">
                <div className="message-content">
                  <div className="loading-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                className="message-input"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
              />
              <button
                className="send-button"
                onClick={handleSend}
                disabled={isLoading}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
