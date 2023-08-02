// 手动模拟分页
export const   pageInfo = (pageSize = 10, pageNum = 1, data)=> {
  if (data && data.length > 0) {
    const firstIndex = pageSize * (pageNum - 1)
    const endIndex = (pageSize-10)+9 + (pageSize * (pageNum - 1))
    const nextNum = pageNum + 1
    const currentInfo = data.slice(firstIndex, endIndex + 1)
    console.log('111111111111111111',firstIndex,endIndex,currentInfo)
    return {currentInfo,nextNum}
  }
}