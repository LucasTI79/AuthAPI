import api from './api';
// interface ResponseApi{
//     token: string;
//     user: {
//         name:string;
//         email:string;
//     },
//     auth(): Promise<ResponseApi>;
// }

export async function signIn()/*: Promise<ResponseApi>*/{

    // const { email, password } = req.body;

    const email = "lukasalves271@hotmail.com"
    const password = "020918"    

    const data = {
        email,
        password
    }

    return response = await api.post('/auth/authenticate', data );

    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'asmnkldsnakld',
                user:{
                    name:'Lucas',
                    email: 'lukasalves271@gmail.com',
                },
            })
        }, 2000);
    });
}