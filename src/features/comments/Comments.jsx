import { Tree, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useParams } from 'react-router-dom'

import { fetchComments, fetchChildComments, selectComments } from './commentsSlice'
import Loader from '../../components/Loader'
import formatDate from '../../utils/formatDate'
import ErrorMessage from '../../components/ErrorMessage'
import { COMMENTS_PER_POST } from '../../utils/constants'
import { selectStoryData } from '../story/storySlice'

const { Title } = Typography

const Comments = () => {
  const dispatch = useDispatch()
  const story = useSelector(selectStoryData)
  const { data, isLoading, isError } = useSelector(selectComments)
  const [selectedKeys, setSelectedKeys] = useState([])
  const { id } = useParams()
  const isStoryLoaded = story?.id.toString() === id

  useEffect(() => {
    if (story && story.kids && isStoryLoaded) {
      dispatch(fetchComments(story.kids))
    }
  }, [story, dispatch, isStoryLoaded])

  const formatComments = useCallback((comments) => {
    const getChildren = (kids, children) => {
      if (children.length !== 0) {
        return formatComments(children)
      }

      if (kids.length !== 0) {
        return [{ title: <Loader size='small' />, key: uuidv4(), isLeaf: true }]
      }

      return []
    }

    return comments.map((item) => {
      const child = getChildren(item?.kids ?? [], item?.children ?? [])

      return {
        title: (
          <div>
            <div>
              <b>{item.by}</b> <span style={{ color: 'gray' }}>{formatDate(item.time)}</span>
            </div>
            <div>{item.text}</div> {/* I didn't decode for security reasons */}
          </div>
        ),
        key: item.id,
        ...{ ...(child.length != 0 ? { children: child } : {}) },
      }
    })
  }, [])

  const treeData = formatComments(data ?? [])

  const onExpand = useCallback(
    (expandedKeys) => {
      setSelectedKeys(expandedKeys)
      dispatch(fetchChildComments(expandedKeys[expandedKeys.length - 1]?.toString()))
    },
    [dispatch],
  )

  if (isLoading) {
    return <Loader size='large' />
  }

  if (isError) {
    return <ErrorMessage message='Error loading comments.' />
  }

  return isStoryLoaded && story?.kids?.length ? (
    <>
      <Title level={2}>
        {story.descendants < COMMENTS_PER_POST ? story.descendants : `Last ${COMMENTS_PER_POST}`}{' '}
        {story.descendants === 1 ? 'Comment' : 'Comments'}
      </Title>
      <Tree
        treeData={treeData}
        onExpand={onExpand}
        expandedKeys={selectedKeys}
        showLine
        style={{ padding: '20px', overflowX: 'scroll' }}
      />
    </>
  ) : null
}

export default Comments
