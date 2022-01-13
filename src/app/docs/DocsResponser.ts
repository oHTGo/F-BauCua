import { ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ResponseServer } from '../responseServer';

@ApiExtraModels(ResponseServer)
export class DocsResponser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static sendOk(): Record<string, unknown> {
    return {
      schema: {
        allOf: [{ $ref: getSchemaPath(ResponseServer) }],
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static sendOkItem(model: any): Record<string, unknown> {
    return {
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseServer) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static sendOkItems(model: any): Record<string, unknown> {
    return {
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseServer) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    };
  }
}
