import React, { useState } from 'react';
import { Modal, Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import request from 'umi-request';

const { Dragger } = Upload;

const ImportModal = ({ visible, onCancel, onOk }: any) => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      fileList.forEach((file) => formData.append('file', file));

      const response = await request.post('/api/import', { data: formData });
      const { success } = response;

      if (success) {
        message.success('导入成功');
        onOk();
      } else {
        message.error('导入失败');
      }
    } catch (error) {
      message.error('导入失败');
    }
  };

  return (
    <Modal
      title="导入表格"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpload}>
          确定
        </Button>,
      ]}
    >
      <Dragger
        fileList={fileList}
        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
        beforeUpload={() => false}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
        <p className="ant-upload-hint">支持xlsx, xls格式</p>
      </Dragger>
    </Modal>
  );
};

export default ImportModal;
