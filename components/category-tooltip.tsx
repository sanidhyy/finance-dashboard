import type {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

type CategoryTooltipProps = {
  active: boolean | undefined;
  payload: Payload<ValueType, NameType>[] | undefined;
};

export const CategoryTooltip = ({ active, payload }: CategoryTooltipProps) => {
  if (!active || !payload) return null;

  const name = payload[0].payload.name;
  const value = payload[0].value as number;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {name}
      </div>

      <Separator />

      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-rose-500 rounded-full" aria-hidden />

            <p className="text-sm text-muted-foreground">Expenses</p>
          </div>

          <p className="text-sm text-right font-medium">
            {formatCurrency(value * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
