import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseUrl = "https://kne-app-backend.onrender.com/api";

const kneApi = axios.create({
    baseURL: baseUrl
});

kneApi.interceptors.request.use(

    async(config) => {
        const token = await AsyncStorage.getItem("token");
        if ( token ) {
            config.headers['Authorization'] = token;
        }

        return config;
    }

)

export default kneApi;