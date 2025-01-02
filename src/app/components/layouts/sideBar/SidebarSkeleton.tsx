import styles from "./Sidebar.module.scss";

const SideBarSkeleton = () => {
  return (
    <div className={styles.sidebar}>
      <>
        <div className={styles.sidebar__links}>
          <div className={styles.sidebar__linkSkeleton} />
          <div className={styles.sidebar__linkSkeleton} />
        </div>

        <div className={styles.sidebar__bottom}>
          <div className={styles.sidebar__logIconSkeleton} />
        </div>
      </>
    </div>
  );
};

export default SideBarSkeleton;
