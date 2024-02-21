import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../public/images/logo1.jpg";
import titleImage from "../../public/images/rick_and_morty.jpg";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          position: "relative",
        }}
      >
        <div>
          <Link href="/" passHref>
            <Image src={logoImg} alt="Logo" width={70} height={70} />
          </Link>
        </div>
        {!isHomePage && (
          <div>
            <Image src={titleImage} alt="Logo" width={180} height={60} />
          </div>
        )}
      </header>
      {children}
    </>
  );
};

export default Layout;
