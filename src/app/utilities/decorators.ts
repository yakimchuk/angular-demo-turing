import { network } from '@app/config';

export function AggregatedRequest()  {
  return function (target, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

    let original = descriptor.value;
    let last = Date.now();
    let promise;

    let updated = function (...args) {

      if (Date.now() - last > network.aggregation.time) {
        promise = null;
      }

      if (promise) {
        return promise;
      }

      promise = original.apply(this, args);
      last = Date.now();

      return promise;

    };

    descriptor.value = updated;

    return descriptor;
  };
}
