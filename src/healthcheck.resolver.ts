import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class HealthcheckResolver {
  constructor() {}

  @Query(returns => Boolean)
  async healthCheck() {
    return "Servers is running well.."
  }
}