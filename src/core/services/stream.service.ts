import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { v4 } = Packages.uuid;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import {
  IDiscoveryService,
  ILoggerService,
  IStreamsService,
  NAbstractFrameworkAdapter,
  NStreamsService,
} from '@Core/Types';
import { ExpiringMap } from '../utils/expiring-map';
import { Helpers } from '../utils/helpers';
import { IExpiringMap, Nullable, UUID } from '@Utility/Types';

@injectable()
export class StreamService extends AbstractService implements IStreamsService {
  protected readonly _SERVICE_NAME = StreamService.name;
  private _bufferStorage: IExpiringMap<string, NStreamsService.StreamStorage> | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService
  ) {
    super();
  }

  protected async init(): Promise<boolean> {
    this._bufferStorage = new ExpiringMap();
    return true;
  }

  protected async destroy(): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async resolveAccumulateStreamType(
    type: NStreamsService.StreamType,
    request: NAbstractFrameworkAdapter.Request
  ): Promise<NStreamsService.AccumulateResult> {
    const streams: NStreamsService.StreamInfo[] = request.parts();
    if (streams.length === 0) throw new Error('Payload without files');

    let result: NStreamsService.AccumulateResult;
    switch (type) {
      case 'buffer':
        try {
          const files = await this._saveByBuffer(streams);
          result = { streamType: 'buffer', files };
          break;
        } catch (e) {
          console.log(e);
          throw e;
        }
      case 'temp-file':
        throw new Error('Case "temp-file" not implemented');
      case 'temp-s3-strategy':
        throw new Error('Case "temp-s3-strategy not implemented');
      default:
        const kinds: NStreamsService.StreamType[] = ['buffer', 'temp-file', 'temp-s3-strategy'];
        throw Helpers.switchChecker(type, kinds);
    }

    return result;
  }

  private async _saveByBuffer(
    streams: NStreamsService.StreamInfo[]
  ): Promise<NStreamsService.FileInfo[]> {
    const files: NStreamsService.FileInfo[] = [];

    for await (const file of streams) {
      const streamId = v4();

      this._bufferStorage?.set(streamId, {
        name: file.fieldname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: await file.toBuffer(),
      });

      files.push({ name: file.fieldname, streamId: streamId });
    }

    return files;
  }

  public getFile(streamId: UUID): Nullable<NStreamsService.StreamStorage> {
    if (!this._bufferStorage) {
      throw new Error('Buffer Storage not initialize');
    }

    const storage = this._bufferStorage.get(streamId);
    if (!storage) return null;

    return storage;
  }

  public getFileBuffer(streamId: UUID): Nullable<Buffer> {
    const file = this.getFile(streamId);
    return file ? file.buffer : null;
  }
}
