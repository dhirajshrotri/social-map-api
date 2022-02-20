const Cloud = require('@google-cloud/storage')
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const { Storage } = Cloud
const storage = new Storage()

let bucketName = 'photos_socialmaps'

export default class ImageController {
  public async deleteImage(ctx: HttpContextContract) {
    try {
      const file = ctx.request.body().files
      let myBucket = storage.bucket(bucketName)
      const fileList = myBucket.file(file[0])
      return await fileList.delete(function (err) {
        if (!err) {
          return {
            status: 200,
            msg: 'Ok',
          }
        } else {
          return err
        }
      })
    } catch (error) {
      return error
    }
  }

  public async uploadImages({ request }) {
    try {
      const file = request.file('images', {})
      await storage.bucket(bucketName).upload(file.tmpPath, {
        destination: file.clientName,
      })
      let url = `https://storage.googleapis.com/${bucketName}/${file.clientName}`
      return {
        status: '200',
        data: url,
      }
    } catch (error) {}
  }
}
