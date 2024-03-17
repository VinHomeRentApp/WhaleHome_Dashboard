import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Layout, Modal, Spin, Upload, UploadProps, message } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { downloadFileContract, getContractList } from '../../../redux/actions/contract.action'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { contract } from '../../../types/contract.type'
import {
  contentStyle,
  contextStyles,
  detailContextStyles,
  headerStyle,
  layoutStyle,
  titleContextStyle
} from './Styles/StyleContractDetail'

const { Header, Content } = Layout

type Props = {
  selectedContract: contract | null | undefined
  setSelectedContract: React.Dispatch<React.SetStateAction<contract | null | undefined>>
}

const ContractModalDetail = ({ selectedContract, setSelectedContract }: Props) => {
  const {
    contract: { loading }
  } = useSelector((state: RootState) => state)
  const dispatch = useAppDispatch()

  const [messageApi, contextHolder] = message.useMessage()

  const handleDownloadFile = async () => {
    if (selectedContract?.id) {
      await dispatch(downloadFileContract({ id: selectedContract?.id }))
      message.success('Download File Successfully!')
    }
  }

  const props: UploadProps = {
    name: 'file',
    action: `https://whalehome.up.railway.app/api/v1/contracts/upload/${selectedContract?.id}`,
    accept: 'application/pdf',
    method: 'PUT',
    headers: {
      authorization: 'authorization-text'
    },
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf'
      if (!isPDF) {
        message.error('You can only upload PDF files!')
      }
      return isPDF
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`upload ${selectedContract?.id} file uploaded successfully`)
        dispatch(getContractList())
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  return (
    <Modal
      style={{ marginTop: '50px', marginBottom: '50px' }}
      title='Detail Contract'
      centered
      open={!!selectedContract}
      onOk={() => setSelectedContract(null)}
      onCancel={() => setSelectedContract(null)}
      width={1000}
    >
      {' '}
      <Spin spinning={loading}>
        {contextHolder}
        <div style={{ display: 'flex', margin: '10px', justifyContent: 'space-between' }}>
          <div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div>
            {selectedContract?.urlFile && (
              <Button
                onClick={handleDownloadFile}
                type='primary'
                shape='default'
                icon={<DownloadOutlined />}
                size={'large'}
              >
                Full Contract
              </Button>
            )}
          </div>
        </div>
        <Flex gap='middle' wrap='wrap'>
          <Layout style={{ borderRadius: 10, width: '100%', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            <Header style={headerStyle}>Apartment</Header>
            <Content style={contentStyle}>
              <div style={detailContextStyles}>
                <div>
                  <span style={titleContextStyle}>Apartment:</span> {selectedContract?.apartmentName}
                </div>
                <div>
                  <span style={titleContextStyle}>Building:</span>
                  {selectedContract?.buildingName}
                </div>
                <div>
                  <span style={titleContextStyle}>Zone:</span>
                  {selectedContract?.areaName}
                </div>
                <div>
                  <span style={titleContextStyle}>Area:</span>
                  {selectedContract?.zoneName}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={contextStyles}>
                  <span style={titleContextStyle}>Sign Date:</span>
                  {selectedContract?.dateSign}
                </div>
                <div style={contextStyles}>
                  <span style={titleContextStyle}>Start Date:</span>
                  {selectedContract?.dateStartRent}
                </div>
                <div style={contextStyles}>
                  <span style={titleContextStyle}>End Date:</span>
                  {selectedContract?.contractHistory.expiredTime}
                </div>
              </div>
            </Content>
          </Layout>
          <Layout style={layoutStyle}>
            <Header style={headerStyle}>LandLord</Header>
            <Content style={contentStyle}>
              <div style={detailContextStyles}>
                <div>
                  <span style={titleContextStyle}>Name:</span>
                </div>
                <div>
                  <span style={titleContextStyle}>Phone Number:</span>
                </div>
              </div>
              <div style={detailContextStyles}>
                <div>
                  <span style={titleContextStyle}>ID Number:</span>
                </div>
                <div>
                  <span style={titleContextStyle}>Date of issue:</span>
                </div>
                <div>
                  <span style={titleContextStyle}>Place of issue:</span>
                </div>
              </div>
              <div style={contextStyles}>
                <span style={titleContextStyle}>Address:</span>
              </div>
              <div style={contextStyles}>
                <span style={titleContextStyle}>Bank Account:</span>
              </div>
              <div style={contextStyles}>
                <span style={titleContextStyle}>Bank Name:</span>
              </div>
            </Content>
          </Layout>

          <Layout style={layoutStyle}>
            <Header style={headerStyle}>Renter</Header>
            <Content style={contentStyle}>
              <div style={detailContextStyles}>
                <div>
                  <span style={titleContextStyle}>Name:</span> {selectedContract?.contractHistory.users.fullName}
                </div>
                <div>
                  <span style={titleContextStyle}>Phone Number:</span>
                  {selectedContract?.contractHistory.users.phone}
                </div>
              </div>
              <div style={detailContextStyles}>
                <div>
                  <span style={titleContextStyle}>ID Number:</span>
                </div>
                <div>
                  <span style={titleContextStyle}>Date of issue:</span>
                </div>
                <div>
                  <span style={titleContextStyle}>Place of issue:</span>
                </div>
              </div>
              <div style={contextStyles}>
                {' '}
                <span style={titleContextStyle}>Address:</span> {selectedContract?.contractHistory.users.address}
              </div>
            </Content>
          </Layout>
        </Flex>
      </Spin>
    </Modal>
  )
}

export default ContractModalDetail