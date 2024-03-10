// import { Button, Form, Input } from 'antd'
// import { useState } from 'react'
// import { getUserDataFromToken, loginApi } from '../redux/user.slice'
// import { useNavigate } from 'react-router'

// // type FieldType = {
// //   username?: string
// //   password?: string
// // }

// // interface SyntheticEvent {
// //   bubbles: boolean
// //   cancelable: boolean
// //   currentTarget: EventTarget
// //   defaultPrevented: boolean
// //   eventPhase: number
// //   isTrusted: boolean
// //   nativeEvent: Event
// //   preventDefault(): void
// //   stopPropagation(): void
// //   target: EventTarget
// //   timeStamp: Date
// //   type: string
// // }

// const Login: React.FC = () => {
//   const [email, setEmail] = useState<string>('')
//   const [password, setPassword] = useState<string>('')
//   const navigate = useNavigate()

// const handleSubmit = () => {
//   // dispatch(
//   //   login(user).then((res) => {
//   //     localStorage.setItem('token', res)
//   //     getUserDataFromToken().then((data) => {
//   //       localStorage.setItem('user', JSON.stringify(data))
//   //     })
//   //     navigate('/')
//   //   })
//   // )
//   loginApi(email, password)
//     .then((response) => {
//       const token = response.data.data.access_token
//       localStorage.setItem('token', token)
//       getUserDataFromToken().then((data) => {
//         localStorage.setItem('user', JSON.stringify(data))
//       })
//       navigate('/')
//     })
//     .catch((error) => {
//       console.error('Đăng nhập thất bại', error)
//     })
// }

//   return (
//     <div
//       style={{
//         display: 'flex',
//         height: '100%',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundImage: `url(https://vinhome.com.vn/wp-content/uploads/2023/02/the-beverly-1.jpg)`,
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover'
//       }}
//     >
//       <div>
//         <Form
//           name='basic'
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           style={{
//             maxWidth: '100%'
//           }}
//           onFinish={handleSubmit}
//           // onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label='Username'
//             name='username'
//             rules={[{ required: true, message: 'Please input your username!' }]}
//           >
//             <Input
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value)
//               }}
//             />
//           </Form.Item>

//           <Form.Item
//             label='Password'
//             name='password'
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input.Password
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value)
//               }}
//             />
//           </Form.Item>

//           <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//             <Button type='primary' htmlType='submit'>
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   )
// }

// export default Login

import { Button, Form, Grid, Input, theme, Typography } from 'antd'

import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { getUserDataFromToken, loginApi } from '../../redux/actions/user.actions'

const { useToken } = theme
const { useBreakpoint } = Grid
const { Text, Title } = Typography

export default function Login() {
  const { token } = useToken()
  const screens = useBreakpoint()

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

  const handleSubmit = () => {
    loginApi(email, password)
      .then((response) => {
        const token = response.data.data.access_token
        localStorage.setItem('token', token)
        getUserDataFromToken().then((data) => {
          localStorage.setItem('user', JSON.stringify(data))
        })
        navigate('/')
      })
      .catch((error) => {
        console.error('Đăng nhập thất bại', error)
      })
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
          onFinish={handleSubmit}
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
