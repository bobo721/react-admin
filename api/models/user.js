'use strict';
module.exports = (sequelize, DataTypes) => {
  sequelize.addHook('beforeCount', function (options) {
    if (this._scope.include && this._scope.include.length > 0) {
      options.distinct = true
      options.col = this._scope.col || options.col || `"${this.options.name.singular}".id`
    }
  
    if (options.include && options.include.length > 0) {
      options.include = null
    }
  })

  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.B_tool);
  };
  return User;
};