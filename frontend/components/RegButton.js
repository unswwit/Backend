import styles from "../styles/events.module.css";

const RegBtn = ({ link }) => {
  const openLink = () => {
    window.open(link);
  };

  return (
    <button type="button" onClick={openLink} className={styles.regButton}>
      Register
    </button>
  );
};

export default RegBtn;