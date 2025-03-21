import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://10.0.0.9:1337/api',
    headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
        'Content-Type': 'application/json'
    }
});

// const email = 'ofergal@gmail.com';
//https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
//GET /api/:pluralApiId?filters[field][operator]=value
const GetUserByEmail = async (email:string) => {
    try {
        // const client = axiosClient;
        const response = await axiosClient.get(`/user-lists?filters[email][$eq]=${email}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const CreateNewUser = async (data: any) => {
    try {
        const response = await axiosClient.post(`/user-lists`, {data:data});
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export  {
        GetUserByEmail ,
        CreateNewUser
};
