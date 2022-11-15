class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  prepend: (element: T) => void;
  append: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => number;
  getElements: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor(array: T[] | null = null) {
    this.head = null;
    this.size = 0;
    if (array) {
      for (const elem of array) {
        this.append(elem)
      }
    }
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        const temp = this.head;
        this.head = node;
        this.head.next = temp;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex < index - 1) {
          if (curr && curr.next) {
            curr = curr.next;
          }
          currIndex++;
        }
        if (curr) {
          const temp = curr.next;
          curr.next = node;
          node.next = temp;
        }
      }
      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      if (index === 0) {
        this.deleteHead();
      }
      else if (index === this.size) {
        this.deleteTail();
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex < index - 1) {
          if (curr && curr.next) {
            curr = curr.next;
          }
          currIndex++;
        }
        if (curr) {
          const temp = curr.next;
          temp?.next ? curr.next = temp?.next : curr.next = null;
          this.size--;
        }
      }
    }
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  };

  deleteTail() {
    let current;
    let prev;
    if (this.head === null || this.head.next === null) {
      this.head = null;
      this.size = 0;
    } else {
      prev = this.head;
      current = this.head.next;
      while (current.next) {
        prev = current;
        current = current.next;
      }
      prev.next = null;
      this.size--;
    }
  };

  append(element: T) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  getElements() {
    let curr = this.head;
    let arr = [];
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
}