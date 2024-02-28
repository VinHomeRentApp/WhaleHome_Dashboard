import React from 'react'
import { Button } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'

interface ButtonActionProps {
  ID: string
}

const ButtonAction: React.FC<ButtonActionProps> = ({ ID }) => {
  const handleButtonClick = (ID: string) => {
    console.log(ID)
  }

  return <Button icon={<EllipsisOutlined />} onClick={() => handleButtonClick(ID)}></Button>
}

export default ButtonAction
