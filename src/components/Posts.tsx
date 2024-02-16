import { useIsFetching } from "@tanstack/react-query";
import { usePosts } from "../services/queries";

export function Posts() {
    const { data, isLoading, isError, fetchStatus, status } = usePosts();
    const isFetching = useIsFetching();

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error</div>;

    return (
        <div>
            <p>Query function status: {fetchStatus}</p>
            <p>Query data status: {status}</p>
            <p>Global isFetching: {isFetching}</p>
            <p>{data}</p>
        </div>
    );
}
