import { logger } from "../winston/winston";

export function Information(logMessage: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        logger.info(logMessage);
        return await originalMethod.apply(this, args);
      } catch (error) {
        logger.error(`Error: ${error.message}`);
        return await originalMethod.apply(this, args);
      }
    };
  };
}