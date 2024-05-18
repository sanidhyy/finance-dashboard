import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";

import { TransactionForm } from "./transaction-form";

const formSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const createMutation = useCreateTransaction();
  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountMutation = useCreateAccount();
  const accountQuery = useGetAccounts();
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const onCreateAccount = (name: string) => accountMutation.mutate({ name });
  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });

  const isPending =
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen || isPending} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>

          <SheetDescription>Add a new transaction.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
