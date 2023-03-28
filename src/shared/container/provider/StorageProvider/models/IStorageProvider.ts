export default interface IStorageProvider {
  saveFile(file: String): Promise<string>;
}
