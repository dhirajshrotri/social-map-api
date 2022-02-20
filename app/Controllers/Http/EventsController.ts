import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'



export default class EventsController {

  
  public async getAllEvents(ctx: HttpContextContract) {
    try {
      console.log(ctx.request.body())
      return Database.from('events').select('*')
    } catch (error) {
      return error
    }
  },
  
  public async getByLocation({ request }) {
    try {
      let lat = request.qs().lat
      let long = request.qs().long
      let minLat = lat > 0 ? lat - 1 : lat + 1
      let maxLat = lat > 0 ? lat + 1 : lat - 1
      let minLong = long > 0 ? long - 1 : long + 1
      let maxLong = long > 0 ? long + 1 : long - 1
      console.log(" min lat ", minLat, " max lat: ", maxLat)
      console.log(" min long ", minLong, " max long ", maxLong)
      let events = await Database.from('events').where((query) => {
        query.whereBetween('location_lat', [minLat, maxLat])
        .andWhereBetween('location_long', [maxLong, minLong])
      })
      return events
    } catch (error) {
      return error
    }
  },

  public async createEvent({ request }) {
    try {
      let eventname = request.body().name, eventdescription = request.body().description,
      location_lat = request.body().lat, location_long = request.body().long,
      userid = 1000, imageurl = request.body().url
    let result = await Database.insertQuery().table('events').insert({
      userid, eventname, eventdescription, location_lat, location_long, imageurl
      })
    
    return {
      'status': 200,
      data: result
    }
    } catch (error) {
     return error 
    }
  },

  public async getEventById({ request }) {
    try {
      let event = await Database.from('events').where('eventid', parseInt(request.params().id))

    return event
    } catch (error) {
      return error
    }
  }
}
