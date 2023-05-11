import { useEffect } from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {

  
  return (
    <div className={styles.main_container}>
      <div className={styles.content}>
        <h1>Not Results</h1>
      
        <div className={styles.info_container}>
          <p>Try to reset the filters </p>
          
        </div>
      </div>
    </div>
  );
};

export default NotFound;
