import { Tree, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { fetchComments, fetchChildComments } from './commentsSlice'
import Loader from '../../components/Loader'
import { v4 as uuidv4 } from 'uuid'
import formatDate from '../../utils/formatDate'
import ErrorMessage from '../../components/ErrorMessage'
import { COMMENTS_PER_POST } from '../../utils/constants'

const { Title } = Typography

const Comments = () => {
  const dispatch = useDispatch()
  const story = useSelector((state) => state.story.data)
  const { data, isLoading, isError } = useSelector((state) => state.comments)
  const [selectedKeys, setSelectedKeys] = useState([])

  useEffect(() => {
    if (story && story.kids) {
      dispatch(fetchComments(story.kids))
    }
  }, [story, dispatch])

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

  return story?.kids?.length ? (
    <>
      <Title level={2}>
        Last {story.descendants < COMMENTS_PER_POST ? story.descendants : COMMENTS_PER_POST}{' '}
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
