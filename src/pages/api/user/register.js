export default async function handler(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            ok: false,
            error: 'param missing',
            params: {
                username: username,
                password: password
            }
        });
    }

    const fetchResponse = await fetch(`${process.env.API_URL}api/user/register`, {
        method: 'POST',
        body: JSON.stringify({username: username, password: password}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    return res.json({ok: (fetchResponse.status === 200)});
}