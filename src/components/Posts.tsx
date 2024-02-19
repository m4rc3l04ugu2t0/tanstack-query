import { useIsFetching } from "@tanstack/react-query";
import { useIdPosts, usePosts } from "../services/queries";
import {
    useCratePost,
    useDeletePost,
    useUpdatePost,
} from "../services/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { PropPost } from "../types/posts";

export function Posts() {
    const postsIdQuery = useIdPosts();
    const postsQueries = usePosts(postsIdQuery.data);
    const isFetching = useIsFetching();

    const createPostMutation = useCratePost();
    const updatePostMutation = useUpdatePost();
    const deletePostMutation = useDeletePost();

    const { register, handleSubmit } = useForm<PropPost>();

    const handleCreatePost: SubmitHandler<PropPost> = (data) => {
        createPostMutation.mutate(data);
    };

    if (postsIdQuery.isLoading) return <div>Loading...</div>;

    if (postsIdQuery.isError) return <div>Error</div>;

    const handleMarkDoneSubmit = (data: PropPost | undefined) => {
        if (data) updatePostMutation.mutate({ ...data, checked: true });
    };

    const handleDeletePostSubmit = (id: number) => {
        deletePostMutation.mutate(id);
    };

    return (
        <div>
            <form action="post" onSubmit={handleSubmit(handleCreatePost)}>
                <p>New Post:</p>
                <input placeholder="Title" type="text" {...register("title")} />
                <br />
                <input placeholder="Body" type="text" {...register("body")} />

                <br />
                <input
                    type="submit"
                    disabled={createPostMutation.isPending}
                    value={
                        createPostMutation.isPending
                            ? "Submitting..."
                            : "Create new post"
                    }
                />
            </form>
            <p>Query function status: {postsIdQuery.fetchStatus}</p>
            <p>Query data status: {postsIdQuery.status}</p>
            <p>Global isFetching: {isFetching}</p>
            {postsIdQuery.data?.map((id) => (
                <div key={id}>ID: {id}</div>
            ))}
            {postsQueries.map(({ data }, index) => {
                return (
                    <div key={index}>
                        <div>Id: {data?.id}</div>
                        <span>
                            <strong>Title:</strong> {data?.title}
                            <strong>Body:</strong> {data?.body}
                        </span>
                        <div>
                            <button
                                onClick={() => handleMarkDoneSubmit(data)}
                                disabled={data?.checked}
                            >
                                {data?.checked ? "Done" : "Mark as done"}
                            </button>
                            {data && data.id && (
                                <button
                                    onClick={() =>
                                        handleDeletePostSubmit(data?.id)
                                    }
                                >
                                    Delete Post
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
