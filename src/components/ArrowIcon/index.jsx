import { arrowRight } from '../../constants/assets';
import styles from './arrowIcon.module.css';

function ArrowIcon({ direction, color, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${styles.icon} ${direction == 'down' ? styles.downDir : ''} ${
        direction == 'up' ? styles.upDir : ''
      } ${direction == 'left' ? styles.leftDir : ''} ${
        color == 'white' ? styles.whiteCol : ''
      }`}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <img src={arrowRight} alt='right arrow' />
    </div>
  );
}

export default ArrowIcon;
