export class MemStream
{
  // Internal buffer.
  private __buf: Array<number>;

  /*
   *
   */
  constructor()
  {
    this.__buf = new Array<number>();
  }

  /*
   *
   */
  public clear()
  : void
  {
    this.__bufs = [];
  }

  /*
   *
   */
  public appendByte(b: number)
  : void
  {
    this.__buf.push(b & 0xFF);
  }

  /*
   *
   */
  public toArray()
  : UInt8Array
  {
    return new UInt8Array(this.__buf);
  }


}
