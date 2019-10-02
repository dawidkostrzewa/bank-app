const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const env = require('./env.config.js');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.users = require('../models/user.model')(sequelize, Sequelize);
db.bills = require('../models/bill.model')(sequelize, Sequelize);
db.transactions = require('../models/transaction.model')(sequelize, Sequelize);

db.users.hasMany(db.bills, { foreignKey: 'id_owner', sourceKey: 'id' });
db.bills.belongsTo(db.users, { foreignKey: 'id_owner', targetKey: 'id' });


db.users.hasMany(db.transactions, {
  foreignKey: 'id_sender',
  sourceKey: 'id',
});
db.transactions.belongsTo(db.users, {
  as: 'getSenderdata',
  foreignKey: 'id_sender',
  targetKey: 'id',
});
db.users.hasMany(db.transactions, {
  foreignKey: 'id_recipient',
  sourceKey: 'id',
});
db.transactions.belongsTo(db.users, {
  as: 'getRecipientdata',
  foreignKey: 'id_recipient',
  targetKey: 'id',
});

db.start = () => {
  //  console.log("USER ID",us.getId());
  const hash = bcrypt.hashSync(env.adminAccount.password, 10);
  sequelize.sync({ force: false }).then(() => {
    db.users
      .findOne({
        where: {
          email: env.adminAccount.email,
        },
      })
      .then(user => {
        if (!user) {
          db.users
            .create({
              login: env.adminAccount.login,
              password: hash,
              name: env.adminAccount.name,
              surname: env.adminAccount.surname,
              email: env.adminAccount.email,
              date_registration: new Date(),
            })
            .then(createdUser => {
              if (createdUser) {
                db.bills.create({
                  id_owner: createdUser.id,
                  account_bill: env.adminAccount.account_bill,
                  available_funds: env.adminAccount.available_funds,
                });
              }
            });
        } else {
          /* eslint-disable-next-line */
          console.log('user exist');
        }
      });
  });
};

module.exports = db;
