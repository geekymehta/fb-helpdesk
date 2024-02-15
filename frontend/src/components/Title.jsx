import styles from "./Title.module.css";

const Title = ({ className, children }) => {
  return <div className={`${styles.title} ${className}`}>{children}</div>;
};

export default Title;
