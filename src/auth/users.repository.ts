import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // generate salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // Username already exists
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException('who knows??');
      }
    }
  }

  async getUser(authCredentialsDto: AuthCredentialsDto): Promise<JwtPayload> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username }; //use interface JwtPayload for type safety
      return payload;
    } else {
      throw new UnauthorizedException(`Please check your login credentials`);
    }
  }
}
