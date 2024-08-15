import { useCallback } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import routes from '../../utils/routes'
import { useDispatch } from 'react-redux'
import { cleanComments } from '../../features/comments/commentsSlice'

const ButtonBack = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    navigate(routes.HOME)
    dispatch(cleanComments())
  }, [navigate, dispatch])

  return (
    <Button onClick={onClick} type='primary' size='middle' icon={<ArrowLeftOutlined />}>
      Back to news
    </Button>
  )
}

export default ButtonBack
