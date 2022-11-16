interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number, container: (T | null)[] = []) {
    this.size = size;
    container.length ? this.container = container : this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail = this.tail + 1;
    this.length = this.length + 1;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head = this.head + 1;
    this.length = this.length - 1;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size]
  };

  base = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.tail % this.size]
  }
  
  elements = (): (T | null)[] => {
    return [...this.container];
  }

  clear = (): void => {
    this.container = Array(this.size);
  }

  isHead = (index: number): boolean => {
    return this.head === index;
  }

  isTail = (index: number): boolean => {
    return this.tail === index;
  }

  isEmpty = () => this.length === 0;

  isFull = () => this.length === this.size;
}