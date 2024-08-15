import { Alert } from 'antd'
import './index.css'
import PropTypes from 'prop-types'

const ErrorMessage = ({ message }) => {
  return <Alert className='error-message' message={message} type='error' />
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMessage
