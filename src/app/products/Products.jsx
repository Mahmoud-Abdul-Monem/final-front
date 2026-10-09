"use client";

import { useQuery } from "@tanstack/react-query";

export function Products() {
    const { isPending, error, data, isError } = useQuery({
        queryKey: ["products"],
        queryFn: () =>
            fetch("https://api.github.com/repos/TanStack/query").then((res) =>
                res.json(),
            ),
    });
    return {
        isPending,
        error,
        data,
        isError,
    }
}
