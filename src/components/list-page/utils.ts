class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (value: T) => void;
  append: (value: T) => void;
  //   addByIndex: (value: T, index: number) => void;
  //   deleteByIndex: (index: number) => void;
  //   deleteHead: () => void;
  //   deleteTail: () => void;
  //   toArray: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  head: Node<T> | null;
  size: number;

  constructor(initialElements?: T[]) {
    this.head = null;
    this.size = 0;
    initialElements?.forEach((value) => this.append(value));
  }

  prepend = (value: T) => {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  };

  append = (value: T) => {
    const node = new Node(value);
    if (this.size === 0) {
      this.head = node;
    } else {
      let curr = this.head;
      while (curr && curr.next) {
        curr = curr.next;
      }
      if (curr) {
        curr.next = new Node(value);
      }
    }
    this.size++;
  };

  //   deleteHead = (): void => {
  //     if (this.head) {
  //       this.head = this.head.next;
  //       this.size--;
  //     }
  //   };

  //deleteTail: () => void;

  addByIndex = (value: T, index: number): void => {
    if (index < 0 || index > this.size) {
      throw new Error("Please enter an index between 0 and 7");
    } else {
      const node = new Node(value);
      let curr = this.head;
      let currIndex = 0;
      let prev = null;
      while (currIndex < index && curr) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }
      if (prev) prev.next = node;
      node.next = curr;
    }
    this.size++;
  };

  deleteByIndex = (index: number) => {
    let curr = this.head;
    if (index === 0 && curr) {
      this.head = curr.next;
    } else {
      let prev = null;
      let currIndex = 0;

      while (currIndex < index && curr) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }

      if (prev && curr) prev.next = curr.next;
    }
    this.size--;
  };
}
