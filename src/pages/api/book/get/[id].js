export default async function handler(req, res) {
    const { id } = req.query;
    const { apiToken } = req.cookies;

    if (!id || !apiToken) {
        return res.status(400).json({
            ok: false,
            error: 'param missing',
            params: {
                id: id,
                apiToken: apiToken
            }
        });
    }

    const fetchResponse = await fetch(`${process.env.API_URL}api/book/${id}`,
        { headers: { Authorization: `Bearer ${apiToken}` } }
    );

    if (fetchResponse.status === 200) {
        const data = await fetchResponse.json();
        return res.json({ok: true, book: data});
    } else {
        const data = await fetchResponse.json();
        return res.json({ok: false, book: {}});
    }
}