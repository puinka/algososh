interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peek: () => T | null;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  peek = (): T | null => {
    if (this.container.length !== 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = (): number => {
    return this.container.length;
  };

  showContainer = () => {
    return [...this.container];
  };
}
