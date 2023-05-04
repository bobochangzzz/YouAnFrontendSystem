import type {ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React from 'react';

export type Props = {
  values: API.UserVO;
  columns: ProColumns<API.UserVO>[];
  onCancel: () => void;
  onSubmit: (values: API.UserUpdatePasswordRequest) => Promise<void>;
  visible: boolean;
};

const ResetModal: React.FC<Props> = (props) => {
  const {visible, columns, onCancel, onSubmit} = props;

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={
        // 遍历列表 只保留用户密码一列
          columns.map((col) => {
            if (col.dataIndex !== 'userPassword') {
              return {
                ...col, hideInForm: true
              }
            }
            return col;
          })
        }
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default ResetModal;
