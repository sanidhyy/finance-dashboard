import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useConfirm } from "@/hooks/use-confirm";

import { AccountForm } from "./account-form";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen || isPending} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>

            <SheetDescription>Edit an existing account.</SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <AccountForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
