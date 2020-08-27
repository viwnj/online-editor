export default function getExtension(filename: string) {
  return (
    filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
    filename
  );
}
