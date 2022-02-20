import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up () {
     this.schema.raw('ALTER TABLE events ADD imageurl JSON')
  }

  public async down () {
    this.schema.table('events', (table) => {
      table.dropColumn('imageurl')
    })
  }
}
