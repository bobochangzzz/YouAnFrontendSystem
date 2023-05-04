import {
  ActionType,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable
} from "@ant-design/pro-components";
import {Button, Drawer, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useRef, useState} from "react";
import {
  addUserUsingPOST, deleteUserUsingPOST,
  listUserVOByPageUsingPOST,
  updateUserUsingPOST
} from "@/services/YouAnSystem-backend/userController";
import {SortOrder} from "antd/lib/table/interface";
import CreateModal from "@/pages/UserInfo/components/CreateModal";
import UpdateModal from "@/pages/UserInfo/components/UpdateModal";

const UserInfo: React.FC = () => {
  /**
   * @zh-CN 新建窗口的弹窗
   */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
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
        ...fields
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
        id: record.id
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
      title: '用户编号',
      align: 'center',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '用户名称',
      align: 'center',
      dataIndex: 'userAccount',
      valueType: 'text',
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
      valueType: 'text',
    },
    {
      title: '部门名称',
      align: 'center',
      dataIndex: 'departmentName',
      valueType: 'text',
    },
    {
      title: '权限',
      align: 'center',
      dataIndex: 'userRoleName',
      valueEnum: {
        "admin": {
          text: '管理员',
          status: 'Processing',
        },
        "user": {
          text: '普通用户',
          status: 'Default',
        },
      }
    },
    {
      title: '联系电话',
      align: 'center',
      dataIndex: 'phone',
      valueType: 'text',
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
        }
      }
    },
    {
      title: '操作',
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
            handleOnline(record);
          }}
        >
          重置密码
        </Button>,
        <Button
          type="text"
          key="config3"
          onClick={() => {
            handleOffline(record);
          }}
        >
          分配角色
        </Button>,
        <Button
          type="text"
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
    /**
     {
      title: <FormattedMessage id="pages.searchTable.titleDesc" defaultMessage="Description"/>,
      dataIndex: 'desc',
      valueType: 'textarea',
    },
     {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleCallNo"
          defaultMessage="Number of service calls"
        />
      ),
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
    },
     {
      title: <FormattedMessage id="pages.searchTable.titleStatus" defaultMessage="Status"/>,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.default"
              defaultMessage="Shut down"
            />
          ),
          status: 'Default',
        },
        1: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running"/>
          ),
          status: 'Processing',
        },
        2: {
          text: (
            <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Online"/>
          ),
          status: 'Success',
        },
        3: {
          text: (
            <FormattedMessage
              id="pages.searchTable.nameStatus.abnormal"
              defaultMessage="Abnormal"
            />
          ),
          status: 'Error',
        },
      },
    },
     {
      title: (
        <FormattedMessage
          id="pages.searchTable.titleUpdatedAt"
          defaultMessage="Last scheduled time"
        />
      ),
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, {defaultRender, ...rest}, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return (
            <Input
              {...rest}
              placeholder={intl.formatMessage({
                id: 'pages.searchTable.exception',
                defaultMessage: 'Please enter the reason for the exception!',
              })}
            />
          );
        }
        return defaultRender(item);
      },
    },
     {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating"/>,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="Configuration"/>
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          <FormattedMessage
            id="pages.searchTable.subscribeAlert"
            defaultMessage="Subscribe to alerts"
          />
        </a>,
      ],
    },*/
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        rowKey="key"
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params,
                        sort: Record<string, SortOrder>,
                        filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res: any = await listUserVOByPageUsingPOST({
            ...params
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
            }
          }
        }}
        columns={columns}
      />
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
      </Drawer>
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

export default UserInfo;
