import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message } from 'antd';
import { ExportOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import {
  addUserUsingPOST,
  deleteUserUsingPOST,
  importUserDataUsingPOST,
  listUserVOByPageUsingPOST,
  updatePasswordUsingPOST,
  updateUserUsingPOST,
} from '@/services/YouAnSystem-backend/userController';
import { SortOrder } from 'antd/lib/table/interface';
import CreateModal from '@/pages/UserInfo/components/CreateModal';
import UpdateModal from '@/pages/UserInfo/components/UpdateModal';
import ResetModal from '@/pages/UserInfo/components/ResetModal';

const UserInfo: React.FC = () => {
  /**
   * @zh-CN 新建窗口的弹窗
   */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @zh-CN 导入窗口的弹窗
   */
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  /**
   * @zh-CN 导出窗口的弹窗
   */
  const [exportModalVisible, handleExportModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [resetModalVisible, handleResetModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<API.UserVO[]>([]);
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.UserVO) => {
    const hide = message.loading('正在添加');
    try {
      await addUserUsingPOST({
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

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.UserVO) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateUserUsingPOST({
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

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.UserVO) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteUserUsingPOST({
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

  const handleResetPwd = async (fields: API.UserVO) => {
    const hide = message.loading('正在重置密码');
    if (!currentRow) return;
    try {
      await updatePasswordUsingPOST({
        userId: currentRow.id,
        ...fields,
      });
      hide();
      message.success('重置密码成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('重置密码失败，' + error.message);
      return false;
    }
  };

  // 打开文件选择对话框
  const openFileDialog = () => {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.xls,.xlsx'; // 只允许选择 Excel 文件
      input.onchange = (event) => {
        const file = event.target.files[0];
        resolve(file);
      };
      input.onerror = (event) => {
        reject(event);
      };
      input.click();
    });
  };

  // 发送导入请求
  const importData = (formData: any) => {
    return importUserDataUsingPOST(formData);
  };

  const handleImport = async () => {
    try {
      const file: any = await openFileDialog(); // 打开文件选择对话框，获取用户选择的文件
      if (file) {
        const formData = new FormData(); // 创建表单数据
        formData.append('file', file); // 添加文件数据
        const result = await importData(formData); // 发送导入请求
        message.success(result.message);
        actionRef.current?.reload(); // 刷新表格数据
      }
    } catch (error) {
      message.error('导入失败');
      console.error(error);
    }
  };

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '用户编号',
      align: 'center',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '用户名称',
      align: 'center',
      dataIndex: 'userAccount',
    },
    {
      title: '用户密码',
      dataIndex: 'userPassword',
      valueType: 'password',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '用户昵称',
      align: 'center',
      dataIndex: 'userName',
    },
    {
      title: '部门名称',
      align: 'center',
      dataIndex: 'departmentName',
    },
    {
      title: '权限',
      align: 'center',
      dataIndex: 'userRoleName',
      valueEnum: {
        admin: {
          text: '管理员',
          status: 'Processing',
        },
        user: {
          text: '普通用户',
          status: 'Default',
        },
      },
    },
    {
      title: '联系电话',
      align: 'center',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '正常',
          status: 'Processing',
        },
        1: {
          text: '封禁',
          status: 'Error',
        },
      },
    },
    {
      title: '操作',
      width: 80,
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
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
          key="config2"
          onClick={() => {
            handleResetModalVisible(true);
            setCurrentRow(record);
          }}
        >
          重置密码
        </Button>,
        <Button
          key="config3"
          onClick={() => {
            handleOffline(record);
          }}
        >
          分配角色
        </Button>,
        <Button
          key="config4"
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
        search={{
          labelWidth: 120,
        }}
        columns={columns}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          <Button
            type="primary"
            key="export"
            onClick={() => {
              // 调用后端接口导出表格
              window.location.href = `${window.location.origin}/api/user/export`;
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
          /*<Button
            type="primary"
            key="import"
            onClick={() => {
              handleImportModalVisible(true);
              handleImport();
            }}
          >
            <ImportOutlined/> 导入
          </Button>*/
        ]}
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res: any = await listUserVOByPageUsingPOST({
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
      <ResetModal
        columns={columns}
        onCancel={() => {
          handleResetModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        onSubmit={async (value) => {
          const success = await handleResetPwd(value);
          if (success) {
            handleResetModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        visible={resetModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default UserInfo;
