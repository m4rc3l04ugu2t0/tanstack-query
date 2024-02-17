import { useQuery, useQueries } from "@tanstack/react-query";
import { getIdPosts, getPosts } from "./api";

export function useIdPosts() {
    return useQuery({
        queryKey: ["postsId"],
        queryFn: getIdPosts,
    });
}

export function usePosts(ids: (number | undefined)[] | undefined) {
    return useQueries({
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: ["post", id],
                queryFn: () => getPosts(id!),
            };
        }),
    });
}
