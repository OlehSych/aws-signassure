import gql from 'graphql-tag';

const clientSchemaExtensions = gql`
  directive @aws_api_key on OBJECT | FIELD_DEFINITION
  directive @aws_cognito_user_pools on OBJECT | FIELD_DEFINITION
`;
