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

  const Tool = sequelize.define('Tool', {
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    free: DataTypes.INTEGER
  }, {});
  Tool.associate = function(models) {
    Tool.hasMany(models.B_tool);
  };
  return Tool;
};