import type {ProColumns, ProFormInstance} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  values: API.UserVO;
  columns: ProColumns<API.UserVO>[];
  onCancel: () => void;
  onSubmit: (values: API.UserUpdateRequest) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const {values, visible, columns, onCancel, onSubmit} = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values])

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type="form"
        formRef={formRef}
        columns={
          columns.map((col) => {
            if (col.dataIndex === 'id' || col.dataIndex === 'userPassword') {
              return {
                ...col, hideInForm: true
              }
            }
            if (col.dataIndex === 'departmentId') {
              return {
                ...col,
                valueEnum: {
                  // todo 后期通过接口获取当前添加的部门
                  1: {text: '测试部门', status: 'testDepartmentId'},
                  ...col.valueEnum,
                },
              };
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
export default UpdateModal;
