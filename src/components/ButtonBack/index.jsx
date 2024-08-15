import { useCallback } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import routes from '../../utils/routes'

const ButtonBack = () => {
  const navigate = useNavigate()

  const onClick = useCallback(() => {
    navigate(routes.HOME)
  }, [navigate])

  return (
    <Button onClick={onClick} type='primary' size='middle' icon={<ArrowLeftOutlined />}>
      Back to news
    </Button>
  )
}

export default ButtonBack
