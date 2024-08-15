import { useCallback } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import routes from '../../utils/routes'
import { useDispatch } from 'react-redux'

const ButtonBack = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    navigate(routes.HOME)
  }, [navigate, dispatch])

  return (
    <Button onClick={onClick} type='primary' size='middle' icon={<ArrowLeftOutlined />}>
      Back to news
    </Button>
  )
}

export default ButtonBack
