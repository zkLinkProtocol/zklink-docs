module.exports = {
  apps : [{
    name        : "zklink-docs",
    script      : "npm run serve",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  }]
}
