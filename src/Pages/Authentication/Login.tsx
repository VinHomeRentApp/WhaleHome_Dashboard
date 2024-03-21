import { Button, Form, Grid, Image, Input, Spin, theme } from 'antd'

import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { typoColor } from '../../constants/mainColor'
import { RootState, useAppDispatch } from '../../redux/containers/store'
import { handleSubmit } from '../../usecases/HandleLogin'

const { useToken } = theme
const { useBreakpoint } = Grid

export default function Login() {
  const { token } = useToken()
  const screens = useBreakpoint()
  const dispatch = useAppDispatch()
  const { isLoading } = useSelector((state: RootState) => state.auth)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  type Container = React.CSSProperties | undefined

  const styles: { [key: string]: Container } = {
    container: {
      margin: '0 auto',
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: '25%',
      backgroundColor: typoColor.subMainBackground
      // Add box shadow here
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: 'center',
      width: '100%'
    },
    forgotPassword: {
      float: 'right'
    },
    section: {
      alignItems: 'center',
      backgroundColor: typoColor.subMainBackground,
      display: 'flex',
      height: '100vh'
    },
    text: {
      color: typoColor.white1
    }
  }

  return (
    <Spin spinning={isLoading}>
      <div style={styles.section}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center' }}>
            <Image preview={false} style={{ width: '25%', height: '25%' }} src='./main-logo.png' />
          </div>
          {/*  */}
          <Form
            name='normal_login'
            initialValues={{
              remember: true
            }}
            //
            onFinish={async () => {
              await handleSubmit(email, password, dispatch, navigate)
            }}
            layout='vertical'
            requiredMark='optional'
          >
            <div style={{ textAlign: 'center' }}>
              <Form.Item
                name='email'
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input your Email!'
                  }
                ]}
              >
                <Input
                  style={{ width: '80%' }}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  prefix={<MailOutlined />}
                  placeholder='Email'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!'
                  }
                ]}
              >
                <Input.Password
                  style={{ width: '80%' }}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  prefix={<LockOutlined />}
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>
            </div>
            <Form.Item
              style={{
                marginBottom: '0px',
                width: '100%',
                textAlign: 'center'
              }}
            >
              <Button
                block={true}
                type='primary'
                style={{ color: typoColor.subMainBackground, width: '30%', fontWeight: 'initial' }}
                htmlType='submit'
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  )
}
