import { Typography } from 'antd'
import ErrorMessage from '../../components/ErrorMessage'

const { Title } = Typography

const NotFound = () => {
  return (
    <>
      <Title level={1}>404</Title>
      <ErrorMessage message='Page not found.' />
    </>
  )
}

export default NotFound
