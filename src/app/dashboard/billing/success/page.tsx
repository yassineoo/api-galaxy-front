'use client'; // This is required when using hooks like useSearchParams

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
    const [session, setSession]: any = useState(null);

    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        const sessionRes = fetch(`/api/checkout_sessions/${sessionId}`).then((res) =>
            res.json()
        );
        if (sessionRes) {
            setSession(sessionRes);
        }
    }, []);

    return (
        <div>
            <h1>Query Parameter: {sessionId}</h1>
        </div>
    );
}