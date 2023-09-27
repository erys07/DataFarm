const apiUrl = 'https://job.minhafazenda.ag/api';

export async function login(email: any, senha: any) {
    try {
        const response = await fetch(`${apiUrl}/auth/v2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                email,
                senha,
                idPartner: 372,
            }),
        });

        if (!response.ok) {
            throw new Error('Falha na autenticação');
        }

        const data = await response.json();
        const token = data.data.token;

        return token;
    } catch (error) {
        throw error;
    }
}