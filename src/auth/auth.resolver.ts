import { GqlAuthGuard } from './gql-authgaurd';
import { LoginUserInput } from './dto/login-userinput';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() ctx: any,
  ) {
    return this.authService.login(ctx.user);
  }

  @Mutation(() => User)
  signup(@Args('signUpUserInput') signUpUserInput: LoginUserInput) {
    return this.authService.signup(signUpUserInput);
  }
}
