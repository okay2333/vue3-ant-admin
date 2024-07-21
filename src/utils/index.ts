/**
 *
 * 列表型数据转化树形
 */
interface TreeNode {
  id: number
  pid: number
  children?: TreeNode[]
  // 其他属性可以根据需要添加
  [key: string]: any
}

// 临时解决方案用any
export function transListToTreeData(list: any, rootValue: number) {
  const arr: TreeNode[] = []
  list.forEach((item: any) => {
    if (item.pid === rootValue) {
      // 找到了匹配的节点
      // 当前节点的id 和 当前节点的子节点的pid是想等的
      const children = transListToTreeData(list, item.id) // 找到的节点的子节点
      item.children = children // 将子节点赋值给当前节点
      arr.push(item)
    }
  })
  return arr
}
