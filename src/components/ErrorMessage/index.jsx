import { Alert } from 'antd'
import PropTypes from 'prop-types'

import './index.css'

const ErrorMessage = ({ message }) => {
  return <Alert className='error-message' message={message} type='error' />
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMessage
