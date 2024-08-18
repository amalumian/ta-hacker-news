import { Typography } from 'antd'

import Stories from '../../features/stories/Stories'

const { Title } = Typography

const HomePage = () => {
  return (
    <>
      <Title level={1}>Hacker News</Title>
      <Stories />
    </>
  )
}

export default HomePage
