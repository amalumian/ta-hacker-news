const updateTreeData = (list, id, children) => {
  return list.map((node) => {
    if (node.id == id) {
      return {
        ...node,
        children,
      }
    }

    if (node.children && node.children?.length !== 0) {
      return {
        ...node,
        children: updateTreeData(node.children, id, children),
      }
    }

    return node
  })
}

export default updateTreeData
