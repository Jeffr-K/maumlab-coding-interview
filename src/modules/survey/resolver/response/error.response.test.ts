import { GraphQLFormattedError, SourceLocation } from "graphql/index";

export class ErrorResponseTest implements GraphQLFormattedError {
  readonly extensions: { [p: string]: unknown };
  readonly locations: ReadonlyArray<SourceLocation>;
  readonly message: string;
  readonly path: ReadonlyArray<string | number>;


}

export const ErrorResponseTesting = () => {
  const obj: GraphQLFormattedError = {
    extensions: {

    },
    locations: undefined,
    message: "",
    path: undefined
  }
}