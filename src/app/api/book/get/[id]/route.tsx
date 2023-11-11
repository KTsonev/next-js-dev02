import {NextResponse} from 'next/server';
import {cookies} from "next/headers";

export async function GET({params}) {
    const apiToken = cookies().get('api-token')?.value || '';
    const {id = ""} = params;

    if (!id || !apiToken) {
        return NextResponse.json({
                ok: false,
                error: 'param missing'
            },
            {status: 400}
        );
    }

    const fetchResponse = await fetch(`${process.env.API_URL}api/book/${id}`,
        {headers: {Authorization: `Bearer ${apiToken}`}}
    );

    if (fetchResponse.status === 200) {
        const data = await fetchResponse.json();
        return NextResponse.json({ok: true, book: data});
    } else {
        return NextResponse.json({ok: false, book: []});
    }
}