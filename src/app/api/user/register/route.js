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

    const fetchResponse = await fetch(`${process.env.API_URL}api/user/register`, {
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    cookies().delete('api-token');

    return NextResponse.json({ok: (fetchResponse.status === 200)});
}