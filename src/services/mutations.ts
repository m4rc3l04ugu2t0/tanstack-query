import { useMutation } from "@tanstack/react-query";
import { PropPost } from "../types/posts";
import { createPost, deletePost, updatePost } from "./api";
import { queryClient } from "./QueryClient";

export function useCratePost() {
    return useMutation({
        mutationFn: (data: PropPost) => createPost(data),
        onMutate: () => console.log("onMutate"),
        onError: () => console.log("onError"),
        onSuccess: () => console.log("onSuccess"),
        onSettled: async (_, error) => {
            console.log("onSettled");
            if (error) {
                console.log(error);
            }

            await queryClient.invalidateQueries({ queryKey: ["postsId"] });
        },
    });
}

export function useUpdatePost() {
    return useMutation({
        mutationFn: (data: PropPost) => updatePost(data),
        onSettled: async (_, error, variables) => {
            if (error) {
                console.log(error);
            }
            await queryClient.invalidateQueries({ queryKey: ["postsId"] });
            await queryClient.invalidateQueries({
                queryKey: ["post", { id: variables.id }],
            });
        },
    });
}

export function useDeletePost() {
    return useMutation({
        mutationFn: (id: number) => deletePost(id),
        onSuccess: () => console.log("deleted post"),
        onSettled: async (_, error) => {
            if (error) return console.log(error);

            await queryClient.invalidateQueries({ queryKey: ["postsId"] });
        },
    });
}
