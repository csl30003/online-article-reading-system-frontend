export function checkToken() {
    // 检查 token 是否过期，如果过期则清除本地存储中的 token
    if (tokenIsExpired()) {
        localStorage.removeItem('token')
        return false
    }
    return true
}
function tokenIsExpired() {
    const token = localStorage.getItem('token')
    if (!token) {
        return true
    }
    const tokenData = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = tokenData.exp * 1000  // 将时间戳转换为毫秒数
    return Date.now() > expirationTime
}