const prefix = (path) => {
  let prefix = null;
  switch (process.env.NODE_ENV) {
    // ts-jest registers ts-node
    case "test":
      prefix = "src";
      break;
    // development uses tsc-watch now
    case "development":
    case "production":
    default:
      prefix = "dist";
      break;
  }

  return `${prefix}/${path}`;
};

const config = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "timetracker-user",
  password: "123456789",
  database: "timetracker-db",
  synchronize: false,
  logging: false,
  entities: [prefix("{entity,domain,projection}/**/*.*")],
  migrations: [prefix("migration/**/*.*")],
  subscribers: [prefix("{subscriber,domain,projection}/**/*.*")],
  cli: {
    entitiesDir: prefix("{entity,domain,projection}"),
    migrationsDir: prefix("migration"),
    subscribersDir: prefix("{subscriber,domain,projection}"),
  },
};
module.exports = config;
