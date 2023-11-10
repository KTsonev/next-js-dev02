import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function GET(request) {
    const apiToken = cookies().get('api-token')?.value || '';

    if (!apiToken) {
        return NextResponse.json({
                ok: false,
                error: 'param missing'
            },
            {status: 400}
        );
    }

    const fetchResponse = await fetch(`${process.env.API_URL}api/book`,
        {headers: {Authorization: `Bearer ${apiToken}`}}
    );

    if (fetchResponse.status === 200) {
        const data = await fetchResponse.json();
        return NextResponse.json({ok: true, books: data});
    } else {
        const data = await fetchResponse.json();
        return NextResponse.json({ok: false, books: []});
    }
}