import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, DatePicker, Input, Select, Spin } from 'antd';
// import _ from 'lodash';
import moment from 'moment';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
import 'brace/keybinding/emacs';
import 'brace/snippets/python';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { RangePicker } = DatePicker;
const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

// import styles from '../index.less';

@connect(({ strategy, loading }) => ({
  strategy,
  loading: loading.effects['strategy/getStrategyCode'],
}))
class Editor extends PureComponent {
  componentDidMount() {
    const { strategy, dispatch } = this.props;
    const { currentStrategyDetail } = strategy;
    const { strategy_code } = currentStrategyDetail;
    dispatch({
      type: 'strategy/getStrategyCode',
      payload: {
        id: strategy_code,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'strategy/update',
      payload: {
        currentCodeText: '',
      },
    });
  }

  onChange = code => {
    const { dispatch } = this.props;
    dispatch({
      type: 'strategy/update',
      payload: {
        currentCodeText: code,
      },
    });
  };

  editorDidMount = () => {};

  render() {
    const { strategy, loading } = this.props;
    const { currentStrategyDetail, currentCodeText } = strategy;
    const { name } = currentStrategyDetail;
    const action = (
      <Fragment>
        <span>
          <Select defaultValue="minute" style={{ width: 120, marginRight: 10 }}>
            <Option value="minute">分钟</Option>
            <Option value="tick">Tick</Option>
            <Option value="day">每日</Option>
          </Select>
        </span>
        <span>
          <Input style={{ width: 120, marginRight: 10 }} placeholder="vt_symbol" />
        </span>
        <RangePicker
          style={{ width: 350, marginRight: 10 }}
          defaultValue={[moment('2015/01/01', dateFormat), moment('2019/01/01', dateFormat)]}
          format={dateFormat}
        />
        <Button type="default">回测</Button>
        <Button type="primary">保存</Button>
      </Fragment>
    );
    const editorTitle = <Input defaultValue={name || '新建策略'} />;
    return (
      <PageHeaderWrapper action={action} title={editorTitle}>
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <Spin spinning={loading} delay={500}>
            <AceEditor
              height="600px"
              width="100%"
              placeholder="SphinxQuant"
              mode="python"
              theme="monokai"
              name="blah2"
              onLoad={this.editorDidMount}
              onChange={this.onChange}
              fontSize={14}
              showPrintMargin
              showGutter
              highlightActiveLine
              value={currentCodeText}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
              }}
            />
          </Spin>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Editor;
