"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useConfirm } from "@/hooks/use-confirm";

type ActionsProps = {
  id: string;
};

export const Actions = ({ id }: ActionsProps) => {
  const deleteMutation = useDeleteTransaction(id);
  const { onOpen } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            <Trash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
