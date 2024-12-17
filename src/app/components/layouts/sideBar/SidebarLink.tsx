import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./SidebarLink.module.scss";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type SidebarLinkProps = {
  linkName: string;
  path: string;
  icon: string;
  iconPale: string;
  alt: string;
};

const SidebarLink = ({
  linkName,
  path,
  icon,
  iconPale,
  alt,
}: SidebarLinkProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = pathname.includes(path);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!session && path === "/favorite-list") {
      e.preventDefault();
      alert("Please log in to access the favorite cities feature.");
    }
  };

  return (
    <Link className={styles.link} href={path} onClick={handleClick}>
      <Image
        className={styles.image}
        src={isActive ? icon : iconPale}
        alt={alt}
        width={50}
        height={50}
        priority
      />
      <span className={isActive ? styles.name : styles.namePale}>
        {linkName}
      </span>
    </Link>
  );
};

export default SidebarLink;
