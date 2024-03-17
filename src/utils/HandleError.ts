import { MessageInstance } from 'antd/es/message/interface'
import { HttpStatusCode } from 'axios'
import { isEmpty } from 'lodash'

type HandleErrorMessageTypes = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  messageApi: MessageInstance
  title: string
}

export const handleErrorMessage = ({ error, messageApi, title }: HandleErrorMessageTypes) => {
  if (!isEmpty(error)) {
    switch (error.response?.status) {
      case HttpStatusCode.NotFound:
        messageApi.error(`${title} Cannot Found or Request is not correct !`)
        break
      case HttpStatusCode.InternalServerError:
        messageApi.error(`Fetch ${title} Error, Please Try again!`)
        break
      default:
        return
    }
  }
}
