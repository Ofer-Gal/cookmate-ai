import axios from 'axios';
import OpenAI from 'openai';
import  prompts from '@/services/Prompt'

const axiosClient = axios.create({
    baseURL: 'http://10.0.0.9:1337/api',
    headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
        'Content-Type': 'application/json'
    }
});


const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true
  });

const AiModel = async (prompt: string) =>  await openai.chat.completions.create({
        
        model: 'google/gemini-2.0-pro-exp-02-05:free',
        messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        response_format:{type:'json_object'}
    }); 

// const email = 'ofergal@gmail.com';
//https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
//GET /api/:pluralApiId?filters[field][operator]=value
const GetUserByEmail = async (email:string) => {
    try {
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

///api/categories
const GetCategories = async () => {
    try {
        const response = await axiosClient.get(`/categories?populate=*`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export  {
        GetUserByEmail ,
        CreateNewUser,
        GetCategories ,
        AiModel
};
