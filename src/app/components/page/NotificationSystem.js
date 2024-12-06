"use client"

import React, {useEffect, useState} from "react";
import {useNotificationContext} from "../../context/NotificationContext";
import "../../../styles/NotificationSystem.css"

const NotificationSystem = () => {
    const { notifications, removeNotification } = useNotificationContext();
    const [exiting, setExiting] = useState([]);

    useEffect(() => {
        notifications.forEach((notification) => {
            const timer = setTimeout(() => {
                setExiting((prev) => [...prev, notification.id]);
                setTimeout(() => removeNotification(notification.id), 300); // Delay for animation
            }, 3000);

            return () => clearTimeout(timer);
        });
    }, [notifications, removeNotification]);

    return (
        <div className="notification-container">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`notification ${notification.type || ''} ${
                        exiting.includes(notification.id) ? "notification-exit" : ""
                    }`}
                >
                    {notification.message}
                </div>
            ))}
        </div>
    );
};

export default NotificationSystem;
