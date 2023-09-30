const apiUrl = 'https://job.minhafazenda.ag';

export async function login(email: string, senha: string) {
    try {
        const response = await fetch(`${apiUrl}/api/auth/v2`, {
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

export async function machines(name: string, serialNumber: string) {
    try {
      const url = `${apiUrl}/mobile/machine/resources?name=${name}&serialNumber=${serialNumber}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro de rede - Código ${response.status}`);
      }

      const jsonData = await response.json();

      return jsonData;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }