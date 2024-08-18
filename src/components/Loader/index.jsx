import { Spin, Flex } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import './index.css'

const Loader = ({ size }) => {
  return (
    <Flex justify='center' align='center' className='loader'>
      <Spin indicator={<LoadingOutlined spin />} size={size} />
    </Flex>
  )
}

Loader.propTypes = {
  size: PropTypes.string,
}

export default Loader
