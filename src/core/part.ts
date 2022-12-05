export function isPartWithOptions(part: Part): part is PartWithOptions {
  return 'options' in part;
}
