export const up = (pgm) => {
  pgm.createTable('weather_data', {
    id: 'id',
    city: { type: 'varchar(100)', notNull: true },
    temperature: { type: 'numeric', notNull: true },
    description: { type: 'varchar(255)' },
    humidity: { type: 'integer' },
    wind_speed: { type: 'numeric' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') }
  });
};

export const down = (pgm) => {
  pgm.dropTable('weather_data');
};