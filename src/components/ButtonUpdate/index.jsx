import { SyncOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import PropTypes from 'prop-types'

const ButtonUpdate = ({ onClick, isLoading, title }) => {
  return (
    <Button
      type='primary'
      shape='round'
      icon={<SyncOutlined />}
      onClick={onClick}
      size='middle'
      loading={isLoading}
    >
      {title ?? 'Update'}
    </Button>
  )
}

ButtonUpdate.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
}

export default ButtonUpdate
