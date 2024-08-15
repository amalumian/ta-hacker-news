import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, Select, Flex } from 'antd'
import { CalendarOutlined, CommentOutlined, RiseOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'
import IconText from '../../components/IconText'
import ButtonUpdate from '../../components/ButtonUpdate'
import Loader from '../../components/Loader'
import { fetchStories } from './storiesSlice'
import formatDate from '../../utils/formatDate'
import { STORIES_PER_PAGE, DEBOUNCE_WAIT_TIME, FETCH_INTERVAL } from '../../utils/constants'
import { useStorageState } from '../../hooks/useStorageState'
import ErrorMessage from '../../components/ErrorMessage'

const Stories = () => {
  const dispatch = useDispatch()
  const { data, isLoading, isError, hasMore } = useSelector((state) => state.stories)
  const [filterStories, setFilterStories] = useStorageState('filterStories', 'new')

  const handleFilterChange = (value) => {
    setFilterStories(value)
  }

  const handleUpdateStories = useCallback(
    debounce(() => {
      dispatch(fetchStories({ filterStories, page: 0 }))
    }, DEBOUNCE_WAIT_TIME),
    [dispatch, filterStories],
  )

  useEffect(() => {
    dispatch(fetchStories({ filterStories, page: 0 }))
  }, [dispatch, filterStories])

  useEffect(() => {
    const interval = setInterval(() => {
      handleUpdateStories()
    }, FETCH_INTERVAL)

    return () => clearInterval(interval)
  }, [handleUpdateStories])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !isLoading &&
        hasMore
      ) {
        dispatch(fetchStories({ filterStories, page: data.length / STORIES_PER_PAGE }))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dispatch, filterStories, data.length, isLoading, hasMore])

  return (
    <>
      <Flex style={{ marginBottom: '10px' }} align='center' justify='space-between' gap={10}>
        <Select defaultValue={filterStories} onChange={handleFilterChange}>
          <Select.Option value='new'>New Stories</Select.Option>
          <Select.Option value='top'>Top Stories</Select.Option>
          <Select.Option value='best'>Best Stories</Select.Option>
        </Select>
        <ButtonUpdate onClick={handleUpdateStories} isLoading={isLoading} title='Update' />
      </Flex>
      {isError && <ErrorMessage message='Error loading stories.' />}
      <List
        itemLayout='vertical'
        loading={isLoading}
        dataSource={data}
        size='large'
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText
                icon={<RiseOutlined />}
                text={item?.score?.toString() || ''}
                key='list-rating'
              />,
              <IconText icon={<CalendarOutlined />} text={formatDate(item.time)} key='list-date' />,
              <IconText
                icon={<CommentOutlined />}
                text={item?.descendants?.toString() || ''}
                key='list-comments'
              />,
            ]}
          >
            <List.Item.Meta
              title={<Link to={`/story/${item.id}`}>{item.title}</Link>}
              description={item.by}
            />
          </List.Item>
        )}
        style={{ background: '#ffffff', borderRadius: '8px' }}
      />
      {isLoading && data.length > 0 && <Loader size='large' />}
    </>
  )
}

export default Stories
