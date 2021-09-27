import { Card, Col, Row, Tabs } from 'antd';
import { RingProgress, Line,  } from '@ant-design/charts';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

const CustomTab = ({ data, currentTabKey: currentKey }) => (
  <Row
    gutter={8}
    style={{
      margin: '8px 0',
    }}
  >
    <Col span={12}>
      {data.name}
    </Col>
  </Row>
);

const { TabPane } = Tabs;

const OfflineData = ({ activeKey, loading, offlineData, offlineChartData, handleTabChange }) => (
  <Card
    loading={loading}
    className={styles.offlineCard}
    bordered={false}
    style={{
      marginTop: 32,
    }}
  >
    <Tabs activeKey={activeKey} onChange={handleTabChange}>
      {offlineData.map((shop) => (
        <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
          <div
            style={{
              padding: '0 24px',
            }}
          >
            <Line
              forceFit
              height={400}
              data={offlineChartData}
              responsive
              xField="date"
              yField="value"
              seriesField="type"
              interactions={[
                {
                  type: 'slider',
                  cfg: {},
                },
              ]}
              legend={{
                position: 'top-center',
              }}
            />
          </div>
        </TabPane>
      ))}
    </Tabs>
  </Card>
);

export default OfflineData;
