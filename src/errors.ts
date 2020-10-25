interface ForClientErrorData {
  description: string;
  name: string;
}

export class InternalError extends Error {
  public readonly forClient: ForClientErrorData;
  public readonly httpResponseCode: number;
  constructor(payload: ForClientErrorData, statusCode: number) {
    super(payload.description);
    this.name = payload.name;
    this.forClient = payload;
    this.httpResponseCode = statusCode;
  }
}

export class InvalidIdError extends InternalError {
  constructor(message?: string) {
    super(
      {
        description: message || 'The ID specified is not a valid record identifier.',
        name: 'InvalidIdError',
      },
      400,
    );
  }
}

export class NotFoundError extends InternalError {
  constructor(message?: string) {
    super(
      {
        description: message || 'A resource could not be found using the given query parameter(s).',
        name: 'NotFoundError',
      },
      404,
    );
  }
}
