interface Response{
    token: string;
    user: {
        name:string;
        email:string;
    }
}

export function signIn(): Promise<Response>{
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