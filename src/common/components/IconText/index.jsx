import { Space } from 'antd'
import PropTypes from 'prop-types'

const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
)

IconText.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
}

export default IconText
