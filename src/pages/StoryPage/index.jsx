import { Space, Typography } from 'antd'

import Story from '../../features/story/Story'
import Comments from '../../features/comments/Comments'
import ButtonBack from '../../components/ButtonBack'

const { Title } = Typography

const StoryPage = () => {
  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Title level={1}>Story</Title>
      <ButtonBack />
      <Story />
      <Comments />
    </Space>
  )
}

export default StoryPage
