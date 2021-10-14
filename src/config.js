let config = {}

export const API_HOST = 'http://localhost:3001'

export const ADDRESS_BOOK_LIST = API_HOST + '/address-book/api/list'
export const UPLOAD_AVATAR = API_HOST + '/try-upload2'
export const IMG_PATH = API_HOST + '/img'

//新增到資料庫的  TEST_AVATAR資料表
export const TEST_AVATAR = API_HOST + '/test_avatar';



config = { API_HOST, ADDRESS_BOOK_LIST, UPLOAD_AVATAR, IMG_PATH }
export default config
