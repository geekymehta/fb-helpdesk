import styles from "./Input.module.css";

const Input = ({ className }) => {
  return <div className={`${styles.Input} ${className}`}></div>;
};

export default Input;
