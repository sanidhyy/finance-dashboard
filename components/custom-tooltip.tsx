import { format } from "date-fns";
import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

type CustomTooltipProps = {
  active: boolean | undefined;
  payload: Payload<ValueType, NameType>[] | undefined;
};

export const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload) return null;

  const date = payload[0].payload.date as Date;
  const income = payload[0].value as number;
  const expenses = payload[1].value as number;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(date, "MMM dd, yyyy")}
      </div>

      <Separator />

      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-blue-500 rounded-full" aria-hidden />

            <p className="text-sm text-muted-foreground">Income</p>
          </div>

          <p className="text-sm text-right font-medium">
            {formatCurrency(income)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded-full" aria-hidden />

            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>

          <p className="text-sm text-right font-medium">
            {formatCurrency(expenses * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
