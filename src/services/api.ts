import axios from "axios";
import { PropPost } from "../types/posts";

const BASE_URL = "http://localhost:8080/posts/";
// const axiosInstance = axios.create({
//     baseURL: BASE_URL,
// });

export const getIdPosts = async () => {
    const response = await axios.get<PropPost[]>(BASE_URL);

    return response.data.map((post) => post.id);
};

export const getPosts = async (id: number) =>
    (await axios(`${BASE_URL}${id}`)).data;
