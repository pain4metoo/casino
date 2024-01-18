import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p className={styles.year}>2024</p>
      <a href='https://github.com/pain4metoo' className={styles.author}>
        pain4metoo
      </a>
    </div>
  );
};

export default Footer;
