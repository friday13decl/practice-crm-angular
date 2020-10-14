const {
  MONGO_DB_ADDR,
  MONGO_DB_PORT,
  MONGO_DB_NAME,
  PORT,
  JWT_SECRET,
  YA_DISK_TOKEN,
  FILE_UPLOAD_PATH
} = process.env

module.exports = {
  mongoUri: `mongodb://${MONGO_DB_ADDR}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`,
  port: PORT,
  jwtSecret: JWT_SECRET,
  yaDiskToken: YA_DISK_TOKEN,
  fileUploadPath: FILE_UPLOAD_PATH
}