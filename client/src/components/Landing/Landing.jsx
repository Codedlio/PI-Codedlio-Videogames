import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import video from '../../media/video5.mp4';

const Landing = () => {
  
  return (
    <div className={styles.home}>
    <div className={styles.buttonContainer}>
      <Link to="/home">
        <button className={styles.button}>▶</button>
      </Link>
    </div>
    
    <div className={styles.videoContainer}>
      <video autoPlay muted loop className={styles.video}>
        <source src={video} type='video/mp4' />
      </video>
    </div>
  </div>
  
    

     
     
  );  

};

export default Landing;
