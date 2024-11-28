"use client"

import React, { createContext, useState, useContext, useEffect } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message) => {
        setNotifications((prev) => [...prev, { id: Date.now(), message }]);
    };

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => useContext(NotificationContext);
