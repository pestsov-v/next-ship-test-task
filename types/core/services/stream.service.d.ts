import { UUID } from '@Utility';
import { IAbstractService, NAbstractFrameworkAdapter } from '@Core/Types';
import { Nullable } from '@Utility/Types';

export interface IStreamsService extends IAbstractService {
  resolveAccumulateStreamType(
    type: NStreamsService.StreamType,
    request: NAbstractFrameworkAdapter.Request
  ): Promise<NStreamsService.AccumulateResult>;
  getFile(streamId: UUID): Nullable<NStreamsService.StreamStorage>;
  getFileBuffer(streamId: UUID): Nullable<Buffer>;
}

export namespace NStreamsService {
  export type StreamType = 'buffer' | 'temp-file' | 'temp-s3-strategy';

  export type StreamInfo = {
    fieldname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    toBuffer(): Promise<Buffer>;
  };

  export type StreamStorage = {
    name: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
  };

  export type AccumulateResult = {
    streamType: StreamType;
    files: FileInfo[];
  };

  export type FileInfo = {
    name: string;
    streamId: UUID;
  };
}
