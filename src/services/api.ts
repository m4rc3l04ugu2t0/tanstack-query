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

export const getPosts = async (id: number) => {
    return (await axios(`${BASE_URL}${id}`)).data;
};

export const createPost = async (data: PropPost) => {
    return await axios.post(BASE_URL, data);
};

export const updatePost = async (data: PropPost) => {
    await axios.put(`${BASE_URL}${data.id}`, data);
};

export const deletePost = async (id: number) => {
    await axios.delete(`${BASE_URL}${id}`);
};
