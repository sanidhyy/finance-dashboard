import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardPage;
