import { useDispatch, useSelector } from 'react-redux'
import { Card, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import ErrorMessage from '../../components/ErrorMessage'
import formatDate from '../../utils/formatDate'
import { fetchStory, selectStory } from './storySlice'

const Story = () => {
  const dispatch = useDispatch()
  const { data, isLoading, isError, error } = useSelector(selectStory)
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchStory(id))
  }, [dispatch, id])

  if (isLoading) {
    return (
      <Card>
        <Skeleton active title={false} paragraph={{ rows: 3 }} />
      </Card>
    )
  }

  if (isError) {
    return <ErrorMessage message={error} />
  }

  return (
    data && (
      <Card title={data?.title}>
        <div>
          Link:{' '}
          <Link to={data?.url || ''} target='_blank'>
            {data?.url}
          </Link>
        </div>
        <div className='by'>Author: {data?.by}</div>
        <div>Date: {formatDate(data?.time || 0)}</div>
        <div>{data?.descendants ? `Comments: ${data?.descendants}` : null}</div>
      </Card>
    )
  )
}

export default Story
