import { Typography, Space } from 'antd'

import ErrorMessage from '@/common/components/ErrorMessage'
import ButtonBack from '@/common/components/ButtonBack'

const { Title } = Typography

const NotFound = () => {
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Title level={1}>404</Title>
      <ButtonBack />
      <ErrorMessage message='Page not found' />
    </Space>
  )
}

export default NotFound
