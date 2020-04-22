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

  const Damage_tool = sequelize.define('Damage_tool', {
    state: DataTypes.INTEGER,
    note: DataTypes.INTEGER
  }, {});
  Damage_tool.associate = function(models) {
    Damage_tool.belongsTo(models.User);
    Damage_tool.belongsTo(models.Tool);
  };
  return Damage_tool;
};