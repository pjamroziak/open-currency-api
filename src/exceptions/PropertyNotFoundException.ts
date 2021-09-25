class PropertyNotFoundException extends Error {
  constructor(propertyName: string) {
    super(`Property '${propertyName}' not found!`);
  }
}

export default PropertyNotFoundException;
