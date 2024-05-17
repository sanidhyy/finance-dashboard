import { TriangleAlert } from "lucide-react";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { cn } from "@/lib/utils";

type CategoryColumnProps = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({
  id,
  category,
  categoryId,
}: CategoryColumnProps) => {
  const { onOpen: onOpenCategory } = useOpenCategory();

  const onClick = () => {
    if (categoryId) onOpenCategory(categoryId);
  };

  return (
    <button
      disabled={!category}
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category || "Uncategorized"}
    </button>
  );
};
