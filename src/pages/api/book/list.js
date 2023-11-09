export default async function handler(req, res) {
    const { apiToken } = req.cookies;

    if (!apiToken) {
        return res.status(400).json({
            ok: false,
            error: 'param missing',
            params: {
                apiToken: apiToken
            }
        });
    }

    const fetchResponse = await fetch(`${process.env.API_URL}api/book`,
        { headers: { Authorization: `Bearer ${apiToken}` } }
    );

    if (fetchResponse.status === 200) {
        const data = await fetchResponse.json();
        return res.json({ok: true, books: data});
    } else {
        const data = await fetchResponse.json();
        return res.json({ok: false, books: []});
    }
}