export class Helpers {
  public static switchChecker(type: never, kind: unknown[]): Error {
    return new Error(
      `Invalid swatch case variant: "${type}". Supported variants: "${kind.join(', ')}"`
    );
  }
}
