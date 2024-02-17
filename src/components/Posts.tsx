import { useIsFetching } from "@tanstack/react-query";
import { useIdPosts, usePosts } from "../services/queries";

export function Posts() {
    const postsIdQuery = useIdPosts();
    const postsQueries = usePosts(postsIdQuery.data);
    const isFetching = useIsFetching();

    if (postsIdQuery.isLoading) return <div>Loading...</div>;

    if (postsIdQuery.isError) return <div>Error</div>;

    return (
        <div>
            <p>Query function status: {postsIdQuery.fetchStatus}</p>
            <p>Query data status: {postsIdQuery.status}</p>
            <p>Global isFetching: {isFetching}</p>
            {postsIdQuery.data?.map((id) => (
                <div key={id}>ID: {id}</div>
            ))}
            {postsQueries.map(({ data }, index) => {
                // usei o index como key, por o id pode ser undefined
                return (
                    <div key={index}>
                        <div>Id: {data?.id}</div>
                        <span>
                            <strong>Title:</strong> {data?.title}
                            <strong>Body:</strong> {data?.body}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
