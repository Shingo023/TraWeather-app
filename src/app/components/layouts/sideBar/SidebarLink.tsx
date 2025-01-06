import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./SidebarLink.module.scss";
import { usePathname } from "next/navigation";

type SidebarLinkProps = {
  linkName: string;
  path: string;
  icon: string;
  iconPale: string;
  alt: string;
  prefetch?: boolean;
  disabled?: boolean;
};

const SidebarLink = ({
  linkName,
  path,
  icon,
  iconPale,
  alt,
  prefetch = true,
  disabled = false,
}: SidebarLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname.includes(path);

  return (
    <Link
      // href={disabled ? "#" : path}
      href={path}
      prefetch={prefetch}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        }
      }}
      className={`${styles.link} ${disabled ? styles["link--disabled"] : ""}`}
    >
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
