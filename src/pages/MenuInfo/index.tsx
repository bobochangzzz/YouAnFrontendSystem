import type { ProColumns } from '@ant-design/pro-components';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';
import UpdateModal from '@/pages/MenuInfo/components/UpdateModal';
import { PlusOutlined } from '@ant-design/icons';
import CreateModal from '@/pages/MenuInfo/components/CreateModal';
import {
  addMenuUsingPOST,
  deleteMenuUsingPOST,
  listMenuByPageUsingPOST,
  updateMenuUsingPOST,
} from '@/services/YouAnSystem-backend/menuController';

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.MenuVo>();
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const handleAdd = async (fields: API.Menu) => {
    const hide = message.loading('正在添加');
    try {
      await addMenuUsingPOST({
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
  const handleUpdate = async (fields: API.Menu) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateMenuUsingPOST({
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

  const handleRemove = async (record: API.Menu) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteMenuUsingPOST({
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
      title: '上级菜单',
      dataIndex: 'pid',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      align: 'center',
    },
    {
      title: '权限值',
      dataIndex: 'permissionValue',
      align: 'center',
    },
    {
      title: '访问路径',
      dataIndex: 'path',
      align: 'center',
    },
    {
      title: '组件路径',
      dataIndex: 'component',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '未开启',
          status: 'Error',
        },
        0: {
          text: '已开启',
          status: 'Success',
        },
      },
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
            <PlusOutlined /> 添加菜单
          </Button>,
        ]}
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res: any = await listMenuByPageUsingPOST({
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
