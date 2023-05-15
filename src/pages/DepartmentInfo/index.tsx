import type { ProColumns } from '@ant-design/pro-components';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';
import {
  addDepartmentUsingPOST,
  deleteDepartmentUsingPOST,
  listDepartmentVOByPageUsingPOST,
  updateDepartmentUsingPOST,
} from '@/services/YouAnSystem-backend/departmentController';
import UpdateModal from '@/pages/DepartmentInfo/components/UpdateModal';
import { PlusOutlined } from '@ant-design/icons';
import CreateModal from '@/pages/DepartmentInfo/components/CreateModal';

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.DepartmentVO>();
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const handleAdd = async (fields: API.DepartmentVO) => {
    const hide = message.loading('正在添加');
    try {
      await addDepartmentUsingPOST({
        ...fields,
      });
      hide();
      message.success('创建成功');
      handleModalVisible(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };
  const handleUpdate = async (fields: API.DepartmentVO) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateDepartmentUsingPOST({
        id: currentRow.id,
        ...fields,
      });
      hide();
      message.success('操作成功');
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  const handleRemove = async (record: API.DepartmentVO) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteDepartmentUsingPOST({
        id: record.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '部门编号',
      dataIndex: 'id',
      align: 'center',
      hideInForm: true,
    },
    {
      title: '部门名称',
      align: 'center',
      dataIndex: 'departmentName',
    },
    {
      title: '上级部门',
      align: 'center',
      dataIndex: 'parDepartmentName',
    },
    {
      title: '部门负责人',
      align: 'center',
      dataIndex: 'departmentHeadName',
    },
    {
      title: '联系电话',
      align: 'center',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      align: 'center',
      dataIndex: 'email',
    },

    {
      title: '操作',
      width: 60,
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => [
        <Button
          key="config1"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </Button>,
        <Button
          key="config3"
          type="default"
          danger
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        rowKey="key"
        actionRef={actionRef}
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        search={false}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 添加部门
          </Button>,
        ]}
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res: any = await listDepartmentVOByPageUsingPOST({
            ...params,
          });
          if (res.data) {
            return {
              data: res.data.records || [],
              success: true,
              total: res.data.total || 0,
            };
          } else {
            return {
              data: res.data.message || [],
              success: false,
              total: 0,
            };
          }
        }}
      />
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalVisible(false);
        }}
        onSubmit={async (values) => {
          const success = await handleAdd(values);
          if (success) {
            handleModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        visible={createModalVisible}
      />
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default TableList;
