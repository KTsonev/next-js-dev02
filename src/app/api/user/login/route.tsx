import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function POST(request) {
    const {username, password} = await request.json();

    if (!username || !password) {
        return NextResponse.json({
            ok: false,
            error: 'param missing'
        },
            {status: 400}
        );
    }

    const fetchResponse = await fetch(`${process.env.API_URL}api/user/login`, {
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    if (fetchResponse.status === 200) {
        const data = await fetchResponse.json();
        cookies().set('api-token', data.token);

        return NextResponse.json({ok: true});
    } else {
        const message = await fetchResponse.json();
        return NextResponse.json({ok: false, message: message});
    }
}