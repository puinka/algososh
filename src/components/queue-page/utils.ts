import { ElementStates } from "../../types/element-states";

interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => number;
  getTail: () => number;
  isEmpty: () => boolean;
  clear: () => void;
}

export default class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (value: T): void => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = value;
    this.tail++;
    this.length++;
  };

  dequeue = (): void => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  getHead = (): number => {
    return this.head;
  };

  getTail = (): number => {
    return this.tail;
  };

  isEmpty = (): boolean => {
    return this.length === 0;
  };

  clear = (): void => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };
}
