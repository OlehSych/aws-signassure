import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CognitoService {
  private readonly cognito: CognitoIdentityServiceProvider;
  private readonly adminPoolId: string;
  private readonly userPoolId: string;

  constructor(private configService: ConfigService) {
    this.cognito = new AWS.CognitoIdentityServiceProvider();
    this.adminPoolId = this.configService.get(
      'COGNITO_ADMIN_POOL_ID',
    ) as string;
    this.userPoolId = this.configService.get('COGNITO_USER_POOL_ID') as string;
  }

  private async createBaseUser(
    email: string,
    userPoolId = this.userPoolId,
  ): Promise<CognitoIdentityServiceProvider.UserType> {
    const params = {
      UserPoolId: userPoolId,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
      MessageAction: 'SUPPRESS',
    };
    const { User } = await this.cognito.adminCreateUser(params).promise();

    if (!User?.Username) {
      throw new Error('Cognito adminCreateUser failed!');
    }

    return User;
  }

  async createAdmin(
    email: string,
    password: string,
  ): Promise<CognitoIdentityServiceProvider.UserType> {
    const user = await this.createBaseUser(email, this.adminPoolId);
    await this.updateUserPassword(email, password, this.adminPoolId);
    return user;
  }

  async updateAdminEmail(email: string, newEmail: string): Promise<void> {
    await this.updateUserEmail(email, newEmail, this.adminPoolId);
  }

  async createUser(
    companyId: string,
    email: string,
  ): Promise<CognitoIdentityServiceProvider.UserType> {
    const user = await this.createBaseUser(email);
    await this.updateUserCustomAttribute(email, 'company_id', companyId);
    return user;
  }

  async updateUserEmail(
    email: string,
    newEmail: string,
    userPoolId = this.userPoolId,
  ): Promise<void> {
    await this.cognito
      .adminUpdateUserAttributes({
        UserPoolId: userPoolId,
        Username: email,
        UserAttributes: [
          {
            Name: 'email',
            Value: newEmail,
          },
          {
            Name: 'email_verified',
            Value: 'true',
          },
        ],
      })
      .promise();
  }

  async updateUserCustomAttribute(
    email: string,
    key: string,
    value: string,
  ): Promise<void> {
    const params = {
      UserPoolId: this.userPoolId,
      Username: email,
      UserAttributes: [
        {
          Name: `custom:${key}`,
          Value: value,
        },
      ],
    };
    await this.cognito.adminUpdateUserAttributes(params).promise();
  }

  async updateUserPassword(
    email: string,
    password: string,
    userPoolId = this.userPoolId,
  ): Promise<void> {
    await this.cognito
      .adminSetUserPassword({
        UserPoolId: userPoolId,
        Username: email,
        Password: password,
        Permanent: true,
      })
      .promise();
  }

  async deleteUser(email: string, userPoolId = this.userPoolId): Promise<void> {
    await this.cognito
      .adminDeleteUser({
        UserPoolId: userPoolId,
        Username: email,
      })
      .promise();
  }
}
