import React, { FC } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './sale-box.less';

interface SaleBoxProps {
  title: string;
  salePoints: string[];
}

const SalesBox: FC<SaleBoxProps> = ({ title, salePoints }) => {
  return (
    <div className={styles.box_content}>
      <h1>{title}</h1>
      <ul className={styles.sale_points}>
        {salePoints.map((point) => (
          <li className={styles.point}>
            <FontAwesomeIcon icon={faCheck} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesBox;
