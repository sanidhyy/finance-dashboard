import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";

export const useGetTransactions = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const accountId = searchParams.get("accountId") || "";

  const query = useQuery({
    // TODO: Check if params are needed in the key.
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch transactions.");

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};