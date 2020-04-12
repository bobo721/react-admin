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

  const B_tool = sequelize.define('B_tool', {
    active: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  }, {});
  B_tool.associate = function(models) {
    B_tool.belongsTo(models.User);
    B_tool.belongsTo(models.Tool);
  };
  return B_tool;
};