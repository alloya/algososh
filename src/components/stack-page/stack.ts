import { Node } from "../../classes/node";

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void;
  getElements: () => void;
  isEmpty: () => void;
}

export class Stack<T> implements IStack<T> {
  private top: Node<T> | null = null;
  private size: number;

  constructor(node: Node<T> | null) {
    this.top = node;
    this.size = 0;
  }

  push = (item: T): void => {
   let node = new Node(item, this.top)
   this.top = node;
   this.size++;
  };

  pop = (): void => {
    if (this.isEmpty()) {
      throw new Error("stack is empty");
    }
    if (this.top) {
      const tmp = this.top;
      this.top = tmp.next;
      this.size--;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("stack is empty");
    }
    return this.top?.value || null;
  };

  isEmpty = (): boolean => {
    return this.top === null;
  };

  clear = (): void => {
    this.top = null;
    this.size = 0;
  }

  getElements = (): T[] => {
    let curr = this.top;
    let arr = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr.reverse();
  }

  getSize = () => this.size;
}