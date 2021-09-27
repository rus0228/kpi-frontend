import React from 'react';
import { Card, Radio, DatePicker, Statistic } from 'antd';
import numeral from 'numeral';

import styles from '../style.less';

const NewProducts = ({loading, value}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="Number of new products"
    style={{
      height: '100%',
    }}
  >
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Statistic
        value={value}
        valueStyle={{ color: '#3f8600' }}
      />
    </div>
  </Card>
);

export default NewProducts;
