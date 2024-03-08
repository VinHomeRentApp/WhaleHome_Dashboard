import { EllipsisOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

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
