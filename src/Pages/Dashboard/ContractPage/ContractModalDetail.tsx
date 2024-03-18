import { CheckCircleOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Layout, Modal, Spin, Timeline, TimelineItemProps, Upload, UploadProps, message } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getContractList } from '../../../redux/actions/contract.action'
import { getAllPaymentByContract } from '../../../redux/actions/payment.actions'
import { getUserById } from '../../../redux/actions/user.actions'
import { RootState, useAppDispatch } from '../../../redux/containers/store'
import { setIsLoading } from '../../../redux/slices/contract.slice'
import { contract } from '../../../types/contract.type'
import { Payment } from '../../../types/payment.type'
import { http } from '../../../utils/http'
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

const convertPaymentToTimelineItem = (payment: Payment): TimelineItemProps => {
  const label = payment.payment_time
  const children = (
    <>
      <p>{payment.content}</p>
      <p>{payment.total_price} $</p>
    </>
  )
  const color = payment.status ? 'green' : 'blue'
  const dot = payment.status && <CheckCircleOutlined />

  return { label, children, color, dot }
}

const ContractModalDetail = ({ selectedContract, setSelectedContract }: Props) => {
  const {
    contract: { loading },
    user: { landLord },
    payment: { paymentList }
  } = useSelector((state: RootState) => state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getPaymentList = async () => {
      if (selectedContract?.id) await dispatch(getAllPaymentByContract(selectedContract.id))
    }
    getPaymentList()
  }, [selectedContract?.id])

  useEffect(() => {
    if (selectedContract?.landLordId) dispatch(getUserById(selectedContract?.landLordId))
  }, [selectedContract?.landLordId])

  const handleDownloadFile = async () => {
    try {
      dispatch(setIsLoading(true))
      if (selectedContract?.id) {
        const response = await http.get(`/contracts/download/${selectedContract.id}`, {
          responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${selectedContract.id}-${selectedContract.apartmentName}.pdf`)
        document.body.appendChild(link)

        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        message.success('Download File Successfully!')
      }
    } catch (error) {
      message.error('An error occurred while downloading the file. Please try again later.')
    } finally {
      dispatch(setIsLoading(false))
    }
  }
  //
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
        setSelectedContract(info.file.response.data)
        message.success(`upload ${selectedContract?.id} file uploaded successfully`)
        dispatch(getContractList())
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  return (
    <Modal
      style={{ marginTop: '10px', marginBottom: '20px' }}
      title='Detail Contract'
      centered
      open={!!selectedContract}
      onOk={() => setSelectedContract(null)}
      onCancel={() => setSelectedContract(null)}
      width={1400}
    >
      <Spin spinning={loading}>
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
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <div style={{ width: '25%', marginRight: 30, marginTop: 10 }}>
            <h1 style={{ textAlign: 'center' }}>Time Line Payment</h1>
            <div style={{ maxHeight: '500px', overflow: 'auto', overflowX: 'hidden', padding: 10 }}>
              <Timeline pending='Pending...' mode={'left'} items={paymentList.map(convertPaymentToTimelineItem)} />
            </div>
          </div>
          <div style={{ width: '75%' }}>
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
                    <div>
                      <span style={titleContextStyle}>Price:</span>
                      {selectedContract?.contractHistory.price} $
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
                      {landLord?.fullName}
                    </div>
                    <div>
                      <span style={titleContextStyle}>Phone Number:</span>
                      {landLord?.phone}
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
                    {landLord?.address}
                  </div>
                  <div style={contextStyles}>
                    <span style={titleContextStyle}>Bank Account:</span> 060254910980
                  </div>
                  <div style={contextStyles}>
                    <span style={titleContextStyle}>Bank Name:</span> Sacombank
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
          </div>
        </div>
      </Spin>
    </Modal>
  )
}

export default ContractModalDetail
