import type { ProColumns } from '@ant-design/pro-components';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';
import React, { useRef, useState } from 'react';
import UpdateModal from '@/pages/MenuInfo/components/UpdateModal';
import { PlusOutlined, ExportOutlined, ImportOutlined } from '@ant-design/icons';
import CreateModal from '@/pages/MenuInfo/components/CreateModal';
import {
  addEmployeeUsingPOST,
  deleteEmployeeUsingPOST,
  listEmployeeByPageUsingPOST,
  updateEmployeeUsingPOST,
  importEmployeeDataUsingPOST,
} from '@/services/YouAnSystem-backend/employeeController';

const TableList: React.FC = () => {
  const [importModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.Employee>();
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const handleAdd = async (fields: API.EmployeeAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addEmployeeUsingPOST({
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
  const handleUpdate = async (fields: API.EmployeeUpdateRequest) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateEmployeeUsingPOST({
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

  const handleRemove = async (record: API.Employee) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteEmployeeUsingPOST({
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
    return importEmployeeDataUsingPOST(formData);
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
      title: '员工编号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '籍贯',
      dataIndex: 'nativePlace',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '职务',
      dataIndex: 'position',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '学历',
      dataIndex: 'career',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '毕业院校',
      dataIndex: 'school',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '专业',
      dataIndex: 'major',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '技能证书',
      dataIndex: 'certificate',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '员工所属部门编号',
      dataIndex: 'departmentId',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '家庭联系地址',
      dataIndex: 'address',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '银行卡号',
      dataIndex: 'bankCard',
      align: 'center',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '入职时间',
      dataIndex: 'entryTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '身份证号码',
      dataIndex: 'card',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '员工状态',
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
        search={{
          labelWidth: 120,
        }}
        pagination={{
          showQuickJumper: true,
        }}
        columns={columns}
        dateFormatter="string"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 添加员工
          </Button>,
          <Button
            type="primary"
            key="export"
            onClick={() => {
              // 调用后端接口导出表格
              window.location.href = `${window.location.origin}/api/employee/export`;
            }}
          >
            <ExportOutlined /> 导出
          </Button>,
          <Button
            type="primary"
            key="import"
            onClick={() => {
              handleImportModalVisible(true);
              handleImport();
            }}
          >
            <ImportOutlined /> 导入
          </Button>,
        ]}
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res: any = await listEmployeeByPageUsingPOST({
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
