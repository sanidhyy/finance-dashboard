import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AmountInput } from "@/components/amount-input";
import { DatePicker } from "@/components/date-picker";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { insertTransactionSchema } from "@/db/schema";
import { convertAmountToMilliunits } from "@/lib/utils";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type TransactionFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: TransactionFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    const amount = parseFloat(values.amount);
    const amountInMilliunits = convertAmountToMilliunits(amount);

    onSubmit({
      ...values,
      amount: amountInMilliunits,
    });
  };

  const handleDelete = () => {
    onDelete?.();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoCapitalize="off"
        autoComplete="off"
        className="space-y-4 pt-4"
      >
        <FormField
          name="date"
          control={form.control}
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="accountId"
          control={form.control}
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>

              <FormControl>
                <Select
                  placeholder="Select an account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          control={form.control}
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>

              <FormControl>
                <Select
                  placeholder="Select a category"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="payee"
          control={form.control}
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>

              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Add a payee"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>

              <FormControl>
                <AmountInput
                  {...field}
                  disabled={disabled}
                  placeholder="0.00"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="notes"
          control={form.control}
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>

              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  disabled={disabled}
                  placeholder="Optional notes..."
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? "Save changes" : "Create transaction"}
        </Button>

        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="mr-2 size-4" />
            Delete transaction
          </Button>
        )}
      </form>
    </Form>
  );
};
