import { format, parse } from "date-fns";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { convertAmountToMilliunits } from "@/lib/utils";

import { ImportTable } from "./import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

type SelectedColumnsState = {
  [key: string]: string | null;
};

type ImportCardProps = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: ImportCardProps) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") value = null;

      newSelectedColumns[`column_${columnIndex}`] = value;

      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    // map headers and body to the selected fields and set non-selected fields to null.
    const mappedData = {
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);

        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);

            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    // convert it to array of objects so that it can be inserted into database.
    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];

        if (header !== null) acc[header] = cell;

        return acc;
      }, {});
    });

    // format currency and date to match it with database
    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMilliunits(parseFloat(item.amount)),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }));

    onSubmit(formattedData);
  };

  return (
    <div className="mx-auto -mt-6 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Import Transaction
          </CardTitle>

          <div className="flex flex-col items-center gap-x-2 gap-y-2 lg:flex-row">
            <Button size="sm" onClick={onCancel} className="w-full lg:w-auto">
              Cancel
            </Button>

            <Button
              size="sm"
              disabled={progress < requiredOptions.length}
              onClick={handleContinue}
              className="w-full lg:w-auto"
            >
              Continue ({progress}/{requiredOptions.length})
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
