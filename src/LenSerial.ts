import { MemStream } from './MemStream';

export enum EncodedLen
{
  ///   The length is encoded in two bytes.
  L16 = 253,

  ///   The length is encoded in four bytes.
  L32 = 254,

  ///   Special value to encode a variable set to NULL.
  NULL = 255,

}



export class LenSerial
{

  /*
   *
   */
  public encodeNull(ms: MemStream)
  : number
  {
    ms.appendByte(EncodedLen.NULL);
    return 1;
  }


}
