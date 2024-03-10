import { Button, Form, Grid, Input, theme, Typography } from 'antd'

import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../redux/containers/store'
import { handleSubmit } from '../../usecases/HandleLogin'

const { useToken } = theme
const { useBreakpoint } = Grid
const { Text, Title } = Typography

export default function Login() {
  const { token } = useToken()
  const screens = useBreakpoint()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const styles = {
    container: {
      margin: '0 auto',
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: '380px'
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: 'center',
      width: '100%'
    },
    forgotPassword: {
      float: 'right'
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: 'center',
      backgroundColor: token.colorBgContainer,
      display: 'flex',
      height: screens.sm ? '80vh' : 'auto',
      padding: screens.md ? `${token.sizeXXL}px 0px` : '0px'
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>Login</Title>
          <Text style={styles.text}>Welcome back WhaleHome DashBoard</Text>
        </div>
        <Form
          name='normal_login'
          initialValues={{
            remember: true
          }}
          onFinish={() => handleSubmit(email, password, dispatch, navigate)}
          layout='vertical'
          requiredMark='optional'
        >
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
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              prefix={<LockOutlined />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '0px' }}>
            <Button block={true} type='primary' htmlType='submit'>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  )
}
