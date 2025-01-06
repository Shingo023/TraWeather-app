"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "./Sidebar.module.scss";
import SidebarLink from "./SidebarLink";
import { memo, useRef, useState } from "react";
import React from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { getInitials } from "@/utils/getInitials";
import useMediaQuery from "@/hooks/useMediaQuery";
import Link from "next/link";
import LinkTooltip from "../../elements/toolTip/LinkTooltip";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const linkRef = useRef(null);
  const [showListLinkTooltip, setShowListLinkTooltip] = useState(false);
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
              prefetch={false}
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
              <p>Logout</p>
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
            <div
              className={styles.sidebar__linkWrapper}
              ref={linkRef}
              onMouseEnter={() => setShowListLinkTooltip(true)}
              onMouseLeave={() => setShowListLinkTooltip(false)}
            >
              <SidebarLink
                linkName={"Favorite List"}
                path={"/favorite-list"}
                icon={"/favorite-list-icon.svg"}
                iconPale={"/favorite-list-icon-pale.svg"}
                alt={"favorite-list-icon"}
                prefetch={false}
                disabled={true}
              />
              <LinkTooltip
                text="Please login to use Favorite List."
                targetRef={linkRef}
                visible={showListLinkTooltip}
                topToAdjust={!isTablet ? -80 : 45}
                className="favoritesLink"
              />
            </div>

            {isTablet ? (
              <Link className={styles.sidebar__log} href="/login">
                <ArrowRightStartOnRectangleIcon
                  className={styles.sidebar__logIcon}
                />
                <p>Login</p>
              </Link>
            ) : (
              <></>
            )}
          </div>
          {!isTablet ? (
            <Link className={styles.sidebar__log} href="/login">
              <ArrowRightStartOnRectangleIcon
                className={styles.sidebar__logIcon}
              />
              <p>Login</p>
            </Link>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Sidebar);
