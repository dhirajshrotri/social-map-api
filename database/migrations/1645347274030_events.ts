import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {

      table.dropColumn('eventid')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.increments('eventid')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('eventid')
    });

    this.schema.raw('ALTER TABLE events ADD eventid id')
  }
}
