import {Table, Model, Column, Default} from "sequelize-typescript";
import {DataTypes} from "sequelize";

export interface OTPItf {
  id: number;
  user_id: number;
  phone: string;
  code: string;
  issued_at: Date;
  expired_at: Date;
}

@Table({
  tableName     : 'uma_tbl_otp',
  timestamps    : false,
  underscored   : true
})
class OTP extends Model implements OTPItf {

  @Column({
    autoIncrement: true,
    primaryKey: true,
    field: "id",
    type: DataTypes.BIGINT
  })
  id!: number;

  @Column({
    field: "user_id",
    type: DataTypes.BIGINT,
    allowNull: false
  })
  user_id!: number;

  @Column({
    allowNull: false,
    field: "phone",
    type: DataTypes.STRING(20)
  })
  phone!: string;

  @Column({
    type: DataTypes.STRING(6),
    field: "code",
    allowNull: false
  })
  code!: string;

  @Default(DataTypes.NOW)
  @Column({
    field: "issued_at",
    type: DataTypes.DATE,
    allowNull: false
  })
  issued_at!: Date;

  @Column({
    field: "expired_at",
    type: DataTypes.DATE,
    allowNull: false
  })
  expired_at!: Date;

}

export default OTP;