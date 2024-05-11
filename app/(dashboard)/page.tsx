"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

const DashboardPage = () => {
  const { onOpen } = useNewAccount();

  return (
    <div>
      <Button onClick={onOpen}>Add an account</Button>
    </div>
  );
};

export default DashboardPage;
