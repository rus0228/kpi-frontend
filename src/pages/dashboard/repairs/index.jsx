import {Col, Row, Card, Statistic, Tooltip, Empty} from 'antd';
import {useModel, useRequest} from 'umi';
import { GridContent } from '@ant-design/pro-layout';
import React, { Suspense, useState } from "react";
import MostInteractionUsers from "./components/MostInteractionUsers";
import { fakeChartData, getRepairType, getMostInteractionData, getRepairData } from "./service";
import PageLoading from "@/pages/dashboard/revenue/components/PageLoading";
import {ChartCard} from "@/pages/dashboard/revenue/components/Charts";
import {InfoCircleOutlined} from "@ant-design/icons";
import Yuan from "@/pages/dashboard/revenue/utils/Yuan";
import numeral from "numeral";
import {CardFooter, Comparison, ComparisonInt, CardFooterTime, ComparisonTime, Time} from "@/pages/dashboard/CustomComponent";
import {Pie} from "@ant-design/charts";
import {getChangedGlobalStates, getDiffAndPercentage} from "@/pages/dashboard/CustomUtils";
import {isMobile} from 'react-device-detect';
import moment from "moment";
const mobileStyle = isMobile ? {marginTop: 164} : {};
const responsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 8
};

const _responsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 12
};

const Monitor = () => {
  const {initialState} = useModel('@@initialState');
  const { loading, data } = useRequest(fakeChartData);
  const [repairTypeData, setRepairTypeData] = useState({
    repair: 0,
    warranty: 0,
    sos: 0,
    _repair: 0,
    _warranty: 0,
    _sos: 0
  })

  const {repair, warranty, sos, _repair, _warranty, _sos} = repairTypeData
  const [mostInteractionData, setMostInteractionData] = useState([]);
  const [repairData, setRepairData] = useState({
    totalValue: 0,
    totalRepairs: 0,
    completedRepairs: 0,
    cancelledRepairs: 0,
    averageTime: 0,
    averageValue: 0,
    _totalValue: 0,
    _totalRepairs: 0,
    _completedRepairs: 0,
    _cancelledRepairs: 0,
    _averageTime: 0,
    _averageValue: 0
  });
  const {totalValue, totalRepairs, completedRepairs, cancelledRepairs, averageTime, averageValue, _totalValue,
    _totalRepairs, _completedRepairs, _cancelledRepairs, _averageTime, _averageValue
  } = repairData

  const changedStates = getChangedGlobalStates(initialState);
  const {startTime, endTime, _startTime, _endTime, store} = changedStates;

  React.useEffect(() => {
    getRepairData(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setRepairData({
        ...repairData,
        totalValue: res['current']['totalValue'],
        totalRepairs: res['current']['totalRepairs'],
        completedRepairs: res['current']['completedRepairs'],
        cancelledRepairs: res['current']['cancelledRepairs'],
        averageTime: parseFloat(res['current']['averageTime']),
        averageValue: parseFloat(res['current']['averageValue']),
        _totalValue: res['prev']['totalValue'],
        _totalRepairs: res['prev']['totalRepairs'],
        _completedRepairs: res['prev']['completedRepairs'],
        _cancelledRepairs: res['prev']['cancelledRepairs'],
        _averageTime: parseFloat(res['prev']['averageTime']),
        _averageValue: parseFloat(res['prev']['averageValue'])
      })
    })
    getRepairType(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setRepairTypeData({
        ...repairTypeData,
        repair: res['repair'],
        warranty: res['warranty'],
        sos: res['sos'],
        _repair: res['_repair'],
        _warranty: res['_warranty'],
        _sos: res['_sos']
      });
    })
    getMostInteractionData(startTime, endTime, _startTime, _endTime, store).then((res) => {
      setMostInteractionData(res);
    })
  }, [initialState])

  const repairDiffAndPercentage = getDiffAndPercentage(repair, _repair, 0);
  const warrantyDiffAndPercentage = getDiffAndPercentage(warranty, _warranty, 0);
  const sosDiffAndPercentage = getDiffAndPercentage(sos, _sos, 0);
  const time = `${moment(_startTime).format('YYYY/MM/DD')} ~ ${moment(_endTime).format('YYYY/MM/DD')}`;

  return (
    <GridContent style={mobileStyle}>
      <>
        <Suspense fallback={<PageLoading />}>
          <Row gutter={[24, 24]}>
            <Col {...responsiveProps}>
              <ChartCard
                bordered={false}
                title="Number of Repairs"
                action={
                  <Tooltip
                    title={
                      <ComparisonInt current={totalRepairs} prev={_totalRepairs} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <div>{totalRepairs}</div>}
                footer={<CardFooter current={totalRepairs} prev={_totalRepairs}/>}
                contentHeight={46}
              />
            </Col>

            <Col {...responsiveProps}>
              <ChartCard
                bordered={false}
                title="Number of Repairs Completed"
                action={
                  <Tooltip
                    title={
                      <ComparisonInt current={completedRepairs} prev={_completedRepairs} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <div>{completedRepairs}</div>}
                footer={<CardFooter current={completedRepairs} prev={_completedRepairs}/>}
                contentHeight={46}
              />
            </Col>
            <Col {...responsiveProps}>
              <ChartCard
                bordered={false}
                title="Number Of Repairs Without Repair"
                action={
                  <Tooltip
                    title={
                      <ComparisonInt current={cancelledRepairs} prev={_cancelledRepairs} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <div>{cancelledRepairs}</div>}
                footer={<CardFooter current={cancelledRepairs} prev={_cancelledRepairs}/>}
                contentHeight={46}
              />
            </Col>
          </Row>
          <Row gutter={[24,24]} style={{marginTop: 24}}>
            <Col {...responsiveProps}>
              <ChartCard
                bordered={false}
                title="Total Repair Value"
                action={
                  <Tooltip
                    title={
                      <Comparison current={totalValue} prev={_totalValue} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{totalValue}</Yuan>}
                footer={<CardFooter current={totalValue} prev={_totalValue}/>}
                contentHeight={46}
              />
            </Col>
            <Col {...responsiveProps}>
              <ChartCard
                bordered={false}
                title="Average Repair Value"
                action={
                  <Tooltip
                    title={
                      <Comparison current={averageValue} prev={_averageValue} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Yuan>{averageValue}</Yuan>}
                footer={<CardFooter current={averageValue} prev={_averageValue}/>}
                contentHeight={46}
              />
            </Col>
            <Col {...responsiveProps}>
              <ChartCard
                bordered={false}
                title="Average time between processing & completed"
                action={
                  <Tooltip
                    title={
                      <ComparisonTime current={averageTime} prev={_averageTime} _startTime={_startTime} _endTime={_endTime}/>
                    }
                  >
                    <InfoCircleOutlined />
                  </Tooltip>
                }
                loading={loading}
                total={() => <Time seconds={averageTime}/>}
                footer={<CardFooterTime current={averageTime} prev={_averageTime}/>}
                contentHeight={46}
              />
            </Col>
          </Row>
        </Suspense>
        <Row gutter={24} style={{marginTop: 24}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <MostInteractionUsers
                loading={loading}
                mostInteractionData={mostInteractionData}
                time={`${moment(_startTime).format('YYYY/MM/DD')} ~ ${moment(_endTime).format('YYYY/MM/DD')}`}
              />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={24} style={{marginTop: 24}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <Card
                loading={loading}
                bordered={false}
                title="Repair Type"
                style={{
                  height: '100%',
                }}
              >
                {
                  repairTypeData ? (
                    <Pie
                      radius={0.8}
                      angleField="y"
                      colorField="x"
                      data={[
                        {
                          x: 'repair',
                          y: repair,
                          a: repairDiffAndPercentage.diff,
                          b: repairDiffAndPercentage.percentage
                        },
                        {
                          x: 'warranty',
                          y: warranty,
                          a: warrantyDiffAndPercentage.diff,
                          b: warrantyDiffAndPercentage.percentage
                        },
                        {
                          x: 'sos',
                          y: sos,
                          a: sosDiffAndPercentage.diff,
                          b: sosDiffAndPercentage.percentage
                        }
                      ]}
                      label={{
                        type: 'outer',
                        style: {
                          fontSize: 15
                        },
                        formatter: (text, item) => {
                          return `${numeral(item._origin.y).format('0,0')}`;
                        }
                      }}
                      interactions={[{ type: 'element-single-selected' }, { type: 'element-active' }]}
                      tooltip={{
                        customContent: (title, data) => {
                          return data.length > 0 ?
                            `<div style="padding: 10px; font-size: 15px">` +
                            `${data[0]['data']['x']}`+
                            `</div>` +
                            `<div style="padding: 10px; font-size: 15px">` +
                            `${data[0]['data']['y']}`+
                            `</div>` +
                            `<div style="padding: 10px; font-size: 15px">` +
                            `Compared: ${time}`+
                            `</div>` +
                            `<div style="padding: 10px; font-size: 15px">` +
                            `${data[0]['data']['a']}`+
                            `</div>` +
                            `<div style="padding: 10px; font-size: 15px">` +
                            `${data[0]['data']['b']}`+
                            `</div>`
                            : ``;
                        }
                      }}
                    />
                  ) : (
                    <Empty/>
                  )
                }
              </Card>
            </Suspense>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Monitor;
