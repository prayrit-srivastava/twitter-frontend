import React, { useEffect, useState, useMemo } from 'react';
import './messgae.css';
import axios from 'axios';
import UserlogoforMsg from './UserlogoForMsg.js';

export default function MessageBox({ msgid }) {
    const [messageDetails, setMessageDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDetails() {
            try {
                const res = await axios.get(`http://localhost:3000/api/message/getDetails/${msgid}`);
                setMessageDetails(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        getDetails();
    }, [msgid]);

    const timeDifference = useMemo(() => {
        const pastDate = new Date(messageDetails.date);
        const currentDate = new Date();
        return currentDate - pastDate;
    }, [messageDetails]);

    const formatTimePassed = () => {
        const secondsPassed = Math.floor(timeDifference / 1000);
        const minutesPassed = Math.floor(secondsPassed / 60);
        const hoursPassed = Math.floor(minutesPassed / 60);
        const daysPassed = Math.floor(hoursPassed / 24);

        if (daysPassed > 0) return `${daysPassed} days`;
        if (hoursPassed > 0) return `${hoursPassed} hour`;
        if (minutesPassed > 0) return `${minutesPassed} min`;
        return `${secondsPassed} sec`;
    };

    if (loading) {
        return <h5>loading...</h5>;
    }

    return (
        <div className="container-chat">
            <div>
                <UserlogoforMsg image={messageDetails.image} />
            </div>
            <div className='content'>
                <p style={{ fontStyle: 'italic', fontWeight: 'bolder' }}>@{messageDetails.username}</p>
                <div className='msg'>
                    {messageDetails.isactive ? <b>{messageDetails.content}</b> : messageDetails.content}
                    {formatTimePassed()} ago
                </div>
            </div>
        </div>
    );
}
