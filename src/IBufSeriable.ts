export interface IBufSeriable
{

  /*
   * Serializes an object into a buffer.
   */
  public Serialize()
  : UInt8Array;

  /*
   * Deserializes an object from a buffer.
   */
  public Deserialize(buf: UInt8Array, offset: number)
  : number;
}
