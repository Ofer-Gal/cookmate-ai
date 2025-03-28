import axios from "axios";
import OpenAI from "openai";

const picogenGenerator = async (prompt: string) => {
    const apiUrl = "https://api.picogen.io/v1/job/generate";
    const apiToken = process.env.EXPO_PUBLIC_PICOGEN_API_KEY;

    const data = {
        prompt: prompt,
        ratio: "1:1",
    };
    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                "Content-Type": "application/json",
                "API-Token": apiToken,
            },
        });
        console.log(response.data);
        return getImageUrl(response.data[1].id);
    } catch (error) {
        console.error("Error:", error);
    }
};

const getImageUrl = async (imageId: string) => {
    const apiUrl = `https://api.picogen.io/v1/job/get/${imageId}`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                "API-Token": process.env.EXPO_PUBLIC_PICOGEN_API_KEY,
            },
        });
        console.log(response.data);
        return response.data[1].result; // the URL
    } catch (error) {
        console.error("Error:", error);
    }
};

const axiosClient = axios.create({
    baseURL: "http://10.0.0.9:1337/api",
    headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
        "Content-Type": "application/json",
    },
});

//Image generator
const imageGenerator = async (prompt: string) => {
    console.log("imageGenerator:", prompt);
    try {
        const BASE_URL = "https://76.76.21.21"; //aigurulab.tech";
        const result = await axios.post(
            BASE_URL + "/api/generate-image",
            {
                width: 512,
                height: 512,
                input: prompt,
                model: 'flux', //"sdxl", 
                aspectRatio: "1:1", //Applicable to Flux model only
            },
            {
                headers: {
                    "x-api-key": process.env.EXPO_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                    "Content-Type": "application/json", // Content Type
                },
            }
        );
        console.log(result.data.image); //Output Result: Base 64 Image
        return result.data.image;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
        // "Content-Type": "application/json",
        Accept: "application/json",
    },
});

const AiModel = async (prompt: string) => {
    try {
        const data: any = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat-v3-0324:free", //"deepseek/deepseek-r1-distill-llama-70b:free",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            response_format: { type: "json_object" },
        });
        if (data.hasOwnProperty("error")) {
            throw new Error(data.error);
        }
        return stripJSON(data.choices[0]?.message?.content);
    } catch (error) {
        console.error(error);
    }
};

const stripJSON = (content: string) => {
    const count = (content.match(/json/g) || []).length;
    switch (count) {
        case 0:
            return content;
        case 1: {
            const start = content.indexOf("```json");
            const end = content.indexOf("```", start + 1);
            return JSON.parse(content.slice(start + 7, end));
        }
        default:
            const ar = content.split("```json");
            const newAr = [];
            for (const item of ar) {
                // for (let i = 1; i < ar.length; i++) {
                const end = item.indexOf("```");
                if (end === -1) continue;
                newAr.push(JSON.parse(item.slice(0, end)));
            }
            console.log(newAr);
            return newAr; //ar.slice(-(ar.length-1))
    }
};

// const email = 'ofergal@gmail.com';
//https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
//GET /api/:pluralApiId?filters[field][operator]=value
const GetUserByEmail = async (email: string) => {
    try {
        const response = await axiosClient.get(
            `/user-lists?filters[email][$eq]=${email}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const CreateNewUser = async (data: any) => {
    try {
        const response = await axiosClient.post(`/user-lists`, { data: data });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const UpdateUser = async (id: string, data: any) => {
    try {
        const response = await axiosClient.put(`/user-lists/${id}`, {
            data: data,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


///api/categories
const GetCategories = async () => {
    try {
        const response = await axiosClient.get(`/categories?populate=*`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const GetRecipeByCategory = async (category: string) => {
    try {
        const response = await axiosClient.get('/recipes?filters[categories][$contains]=' + category);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}

///api/recipes
const CreateNewRecipe = async (data: any) => {
    try {
        const response = await axiosClient.post(`/recipes`, { data: data });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};



export {
    GetUserByEmail,
    CreateNewUser,
    GetCategories,
    AiModel,
    imageGenerator,
    picogenGenerator,
    CreateNewRecipe,
    UpdateUser, GetRecipeByCategory
};
