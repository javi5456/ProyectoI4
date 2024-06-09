import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from '../orders/Order.entity';
import { Role } from '../auth/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'uuid creada para identificar al usuario',
    example: '550e8400e29b41d4a716446655440000',
  })
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Javier',
  })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({
    description: 'Correo electronico del usuario',
    example: 'Javier@example.com',
  })
  email: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  @ApiProperty({
    description:
      'Contraseña segura del usuario min caracteres 8 con 1 mayuscula 1 numero y 1 caracter (!@#$%^&*) obligatorio',
    example: 'Example123!',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    nullable: false,
  })
  @ApiProperty({
    description: 'Rol del usuario por defecto es user',
    example: 'user',
  })
  role: Role;

  @Column()
  @ApiProperty({
    description: 'Telefono del usuario',
    example: '1234567890',
  })
  phone: number;

  @Column()
  @ApiProperty({
    description: 'Direccion del usuario',
    example: 'Calle 123',
  })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @ApiProperty({
    description: 'Pais del usuario',
    example: 'Colombia',
  })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @ApiProperty({
    description: 'Ciudad del usuario',
    example: 'Medellin',
  })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Order[];
}
