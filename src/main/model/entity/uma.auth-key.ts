import { DataTypes } from 'sequelize';
import {Table, Model, Column, Default} from "sequelize-typescript";

export interface AuthKeyItf {
  user_id: number;
  private_key: string;
  public_key: string | null;
  issued_at: Date;
  expired_at: Date;
}

@Table(
  {
    tableName      : 'uma_tbl_auth_key',
    timestamps     : false,
    underscored    : true
  }
)
class AuthKey extends Model implements AuthKeyItf {  

  @Column({
    autoIncrement: false,
    primaryKey: true,
    field: "user_id",
    type: DataTypes.BIGINT
  })
  user_id!: number;

  @Column({
    allowNull: false,
    field: "private_key",
    type: DataTypes.TEXT
  })
  private_key!: string;

  @Default(null)
  @Column({
    allowNull: true,
    field: "public_key",
    type: DataTypes.TEXT
  })
  public_key!: string | null;

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

export default AuthKey;
