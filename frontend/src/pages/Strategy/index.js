import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Card, Button, Table } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { STRATEGY_TYPE } from '@/utils/const';

import styles from './index.less';

@connect(({ strategy, loading }) => ({
  strategy,
  loading: loading.effects['strategy/getStrategyList'],
}))
class StrategyList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '策略名称',
        dataIndex: 'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
      },
      {
        title: '回测次数',
        dataIndex: 'bt_length',
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: t => STRATEGY_TYPE[t],
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        sorted: true,
        render: time => moment(time).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '操作',
        render: (_, record) => (
          <Fragment>
            <a
              onClick={() => this.onEdit({ strategyID: record.id, record })}
              style={{ marginRight: 8 }}
            >
              编辑
            </a>
            <a onClick={() => this.onBacktestList(record.id)} style={{ marginRight: 8 }}>
              回测列表
            </a>
            <a style={{ color: 'red' }}>删除</a>
          </Fragment>
        ),
      },
    ];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'strategy/getStrategyList',
    });
  }

  onEdit = async ({ strategyID, record }) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'strategy/update',
      payload: {
        currentStrategyDetail: record,
      },
    });
    router.push(`/strategy/list/editor/${strategyID}`);
  };

  onBacktestList = (strategyID = '') => {
    router.push(`/strategy/list/backtestlist/${strategyID}`);
  };

  render() {
    const { strategy, loading } = this.props;
    const { strategyList } = strategy;
    return (
      <PageHeaderWrapper title="策略列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={() => this.onEdit({ strategyID: '', record: {} })}
              >
                新建
              </Button>
            </div>
            <Table loading={loading} dataSource={strategyList} columns={this.columns} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default StrategyList;
