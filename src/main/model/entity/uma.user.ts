import { DataTypes} from 'sequelize';
import { Model, Column, Table, Default } from 'sequelize-typescript';

/**
 * UserInterface
 *
 * @hidable_parameters
 *  phone
 *  status
 *  updated_at
 *  deleted_at
 *  is_deleted
 */
export interface UserItf {
  id?: number
  name: string
  phone?: string | null
  status: number
  login_attempt: number
  registered_at: Date | null
  created_at: Date
  updated_at: Date | null
  deleted_at: Date | null
  is_deleted: number
}

@Table({
  tableName     : 'uma_tbl_users',
  timestamps    : false,
  underscored   : true
})
class User extends Model implements UserItf {

  /**
   * @static
   * @var number
   * 
   * User Status Enumeration
   */
  static UNREGISTERED = 0;
  static ACTIVE = 1;
  static SUSPENDED = 2;

  /**
   * @static
   * @var number
   * 
   * A configuration to determine how much time that
   * needed for user to trigger a constantly wrong password attempt and
   * then punished.
   * 
   * For example, if I logged in as user A, and then I typed a wrong password 
   * for { DEFAULT_WRONG_PASSWORD_PUNISHMENT } times, the system will be punish 
   * me by suspending my account, and I need to reset my password as the result
   * of what I'm doing.
   * 
   * However, if you typed a wrong password 2 times, and then the 3rd time you 
   * typed it correctly, the counter will be reset to 0.
   * 
   * @see /repository/user-repository.wrongPasswordPunisher for more information.
   */
  static DEFAULT_WRONG_PASSWORD_PUNISHMENT = 5;

  /**
   * @var array
   * hidden
   *  Hide attributes with variable names below
   */
  private hidden = [
    'phone',
    'status',
    'updated_at',
    'deleted_at',
    'is_deleted'
  ];

  @Column({
    autoIncrement: true,
    primaryKey: true,
    field: "id",
    type: DataTypes.BIGINT
  })
  id?: number;

  @Column({
    allowNull: false,
    field: "name",
    type: DataTypes.STRING(100)
  })
  name!: string;

  @Default(null)
  @Column({
    allowNull: true,
    field: "phone",
    type: DataTypes.STRING(20)
  })
  phone!: string;

  @Default(0)
  @Column({
    comment: '0: Unregistered | 1: Active | 2: Suspended',
    field: "status",
    type: DataTypes.SMALLINT,
    allowNull: false
  })
  status!: number;

  @Default(0)
  @Column({
    allowNull: true,
    field: "login_attempt",
    type: DataTypes.SMALLINT
  })
  login_attempt!: number;

  @Default(null)
  @Column({
    allowNull: true,
    field: "registered_at",
    type: DataTypes.DATE
  })
  registered_at!: Date | null;

  @Default(DataTypes.NOW)
  @Column({
    allowNull: true,
    field: "created_at",
    type: DataTypes.DATE
  })
  created_at!: Date;

  @Default(null)
  @Column({
    field: "updated_at",
    type: DataTypes.DATE,
    allowNull: true
  })
  updated_at!: Date | null;

  @Default(null)
  @Column({
    field: "deleted_at",
    type: DataTypes.DATE,
    allowNull: true
  })
  deleted_at!: Date | null;

  @Default(0)
  @Column({
    allowNull: false,
    field: "is_deleted",
    comment: "0: Not Deleted | 1: Deleted",
    type: DataTypes.SMALLINT
  })
  is_deleted!: number;

  /**
   * toJSON
   *  Sequelize function settings to cast this model
   *  into JSON
   */
  toJSON () {
    // hide hidden fields
    let attributes = Object.assign({}, this.get())
    for (let a of this.hidden) {
      delete attributes[a]
    }
    return attributes
  }

  /**
   * Virtual Attributes
   */

  /**
   * user_status
   *  Get enumeration from status and
   *  return the value into wording one.
   */
  @Column({
    type: DataTypes.VIRTUAL(DataTypes.STRING)
  })
  get user_status(): string {
    let returned_value = '';

    switch(this.getDataValue('status')){
      case User.UNREGISTERED: returned_value = "UNREGISTERED"; 
              break;

      case User.ACTIVE: returned_value = "ACTIVE";
              break;

      case User.SUSPENDED: returned_value = "SUSPENDED";
              break;
    }

    return returned_value;
  }

}

export default User;