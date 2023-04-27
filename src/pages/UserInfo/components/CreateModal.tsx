import type {ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.UserVO>[];
  onCancel: () => void;
  onSubmit: (values: API.UserAddRequest) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const {visible, columns, onCancel, onSubmit} = props;

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        columns={
          // 将“权限”这列的文本输入框替换成select下拉框和将“用户编号”这列隐藏无需用户填入
          columns.map((col) => {
            if (col.dataIndex === 'departmentName') {
              col.dataIndex = 'departmentId'
              return {
                ...col,
                valueEnum: {
                  // todo 后期通过接口获取当前添加的部门
                  1: {text: '测试部门', status: 'testDepartmentId'},
                  ...col.valueEnum,
                },
              };
            }
            if (col.dataIndex === 'id') {
              return {
                ...col, hideInForm: true
              };
            }
            if (col.dataIndex === 'status') {
              return {
                ...col,
                valueEnum: {
                  0: {text: '正常', status: '正常'},
                  1: {text: '封禁', status: '封禁'},
                }
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
export default CreateModal;
