import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center lg:flex">
        <Image src="/logo.svg" alt="Finance logo" height={28} width={28} />

        <p className="ml-2.5 text-2xl font-semibold text-white">Finance</p>
      </div>
    </Link>
  );
};
