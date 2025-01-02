"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Sidebar.module.scss";
import SidebarLink from "./SidebarLink";
import { memo } from "react";
import React from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { getInitials } from "@/utils/getInitials";
import useMediaQuery from "@/hooks/useMediaQuery";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const isTablet = useMediaQuery("(max-width: 768px)");

  const handleSignOut = () => {
    signOut({ callbackUrl: "/weather" });
  };

  return (
    <div className={styles.sidebar}>
      {status === "authenticated" && session.user.name ? (
        <>
          <div className={styles.sidebar__links}>
            <SidebarLink
              linkName={"Weather"}
              path={"/weather"}
              icon={"/weather-icon.svg"}
              iconPale={"/weather-icon-pale.svg"}
              alt={"weather-icon"}
            />
            <SidebarLink
              linkName={"Favorite List"}
              path={"/favorite-list"}
              icon={"/favorite-list-icon.svg"}
              iconPale={"/favorite-list-icon-pale.svg"}
              alt={"favorite-list-icon"}
            />
          </div>

          <div className={styles.sidebar__bottom}>
            <div className={styles.sidebar__user}>
              {!isTablet ? (
                <>
                  <UserCircleIcon className={styles.sidebar__userIcon} />
                  <p>{session.user?.name}</p>
                </>
              ) : (
                <p>{getInitials(session.user.name)}</p>
              )}
            </div>

            <div className={styles.sidebar__log} onClick={handleSignOut}>
              <ArrowLeftStartOnRectangleIcon
                className={styles.sidebar__logIcon}
              />
              <p>Log Out</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.sidebar__links}>
            <SidebarLink
              linkName={"Weather"}
              path={"/weather"}
              icon={"/weather-icon.svg"}
              iconPale={"/weather-icon-pale.svg"}
              alt={"weather-icon"}
            />
            <SidebarLink
              linkName={"Favorite List"}
              path={"/favorite-list"}
              icon={"/favorite-list-icon.svg"}
              iconPale={"/favorite-list-icon-pale.svg"}
              alt={"favorite-list-icon"}
            />
            {isTablet ? (
              <div className={styles.sidebar__log} onClick={() => signIn()}>
                <ArrowRightStartOnRectangleIcon
                  className={styles.sidebar__logIcon}
                />
                <p>Log In</p>
              </div>
            ) : (
              <></>
            )}
          </div>
          {!isTablet ? (
            <div className={styles.sidebar__log} onClick={() => signIn()}>
              <ArrowRightStartOnRectangleIcon
                className={styles.sidebar__logIcon}
              />
              <p>Log In</p>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Sidebar);
