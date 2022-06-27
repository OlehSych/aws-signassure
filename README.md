# SignAssure

## Technologies

- [AWS Lambda](https://aws.amazon.com/lambda)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb)
- [Serverless](https://serverless.com/framework/docs/providers/aws/)
- [NestJS](https://docs.nestjs.com/)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [NestJS Dynamoose](https://github.com/hardyscc/nestjs-dynamoose)

## Setup Workstation

Install AWS CLI

- Windows: `choco install awscli`
- MacOS: `brew install awscli`

Config AWS CLI

```bash
$ aws configure

AWS Access Key ID [****************TKYQ]:
AWS Secret Access Key [****************yNO2]:
Default region name [None]:
Default output format [None]:
```

> Please enter your **AWS Access Key ID** and **AWS Secret Access Key**

## Configure environment variables
```bash
# create .env file from example
  cp .env.example .env
```

## Local Offline Development

```bash
# run dynamodb docker container
$ npm run ddb:start

# run dynamodb init tables migration
$ npm run ddb:migrate

# start nestjs
$ npm run start
```

> After running the app, navigate to http://localhost:3000/graphql in your browser

## Deployment

```bash
# deploy to AWS
$ npm run deploy
```

## Tools

```bash
# re-generate the resources/dynamodb.yml from schemas
$ npm run genres
# re-generate the schema.gql from resolvers
$ npm run build:schema
```

## GraphQL create resolver flow

* add resolver to corresponding module
* add new resolver to gqlSchemaFactory in 'src/generateSchema.ts'
* configure serverless.yml:
  * functions
  * appSync.dataSources
  * appSync.mappingTemplates
