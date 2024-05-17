import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { cn } from "@/lib/utils";

type AccountColumnProps = {
  account: string;
  accountId: string;
};

export const AccountColumn = ({ account, accountId }: AccountColumnProps) => {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => onOpenAccount(accountId);

  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </button>
  );
};
