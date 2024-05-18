import { AccountFilter } from "./account-filter";
import { DateFilter } from "./date-filter";

export const Filters = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2 lg:gap-y-0">
      <AccountFilter />
      <DateFilter />
    </div>
  );
};
