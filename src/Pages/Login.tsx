import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { loginApi } from '../redux/user.slice'

// const onFinish = (values: any) => {
//   console.log('Success:', values)
// }

// const onFinishFailed = (errorInfo: any) => {
//   console.log('Failed:', errorInfo)
// }

// type FieldType = {
//   username?: string
//   password?: string
// }

// interface SyntheticEvent {
//   bubbles: boolean
//   cancelable: boolean
//   currentTarget: EventTarget
//   defaultPrevented: boolean
//   eventPhase: number
//   isTrusted: boolean
//   nativeEvent: Event
//   preventDefault(): void
//   stopPropagation(): void
//   target: EventTarget
//   timeStamp: Date
//   type: string
// }

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = () => {
    loginApi(email, password)
      .then((response) => {
        const token = response.data.data.access_token

        localStorage.setItem('token', token)
      })
      .catch((error) => {
        console.error('Đăng nhập thất bại', error)
      })
  }

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={handleSubmit}
      // onFinishFailed={onFinishFailed}
    >
      <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </Form.Item>

      <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
