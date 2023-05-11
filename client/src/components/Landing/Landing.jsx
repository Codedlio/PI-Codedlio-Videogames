import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import video from '../../media/background_video.mp4';

const Landing = () => {
  
  return (
  <div className={styles.home}>
        <h1>ORIGAME</h1>
        <p>Individual Project</p>
        <Link to ="/home">
        <button className={styles.button}>START</button>
        </Link>
      
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1,
    }}>
      <video autoPlay muted loop style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}>
        <source src={video} type='video/mp4' />
      </video>
      
      
</div>
      {/* El contenido del resto de la página aquí */}
    </div>
  );  

};

export default Landing;
