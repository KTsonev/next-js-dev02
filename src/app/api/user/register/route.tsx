import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function POST(request) {
    const {username, password} = await request.json();

    if (!username || !password) {
        return NextResponse.json({
                ok: false,
                message: 'param missing'
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
    const data = await fetchResponse.json();

    if (fetchResponse.status === 201) {
        return NextResponse.json({ok: true, message: data.message});
    } else {
        return NextResponse.json({ok: false, message: data.error});
    }
}