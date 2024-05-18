"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";

import { Chart } from "./chart";

export const DataCharts = () => {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
    </div>
  );
};
