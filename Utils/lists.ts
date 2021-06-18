import { II } from "./iters";

export type DoublyLinkedListNode<T> = {
  value: T,
  prev: DoublyLinkedListNode<T> | null,
  next: DoublyLinkedListNode<T> | null
};

export class DoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null = null;
  private tail: DoublyLinkedListNode<T> | null = null;

  public append(value: T): void {
    if (this.head === null) {
      this.head = {
        value,
        prev: null,
        next: null
      };

      this.tail = this.head;
    } else {
      const next = {
        value,
        prev: this.tail,
        next: null
      };

      this.tail.next = next;
      this.tail = next;
    }
  }

  public at(index: number): DoublyLinkedListNode<T> {
    let curr = this.head;

    for (let i = 0; i < index; i++) {
      curr = curr.next;
    }

    return curr;
  }

  public remove(node: DoublyLinkedListNode<T>): void {
    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node === this.head) {
      this.head = this.head.next;
    }
  }

  public static from<T>(it: II<T>): DoublyLinkedList<T> {
    const lst = new DoublyLinkedList<T>();

    for (const v of it) {
      lst.append(v);
    }

    return lst;
  }

  public *[Symbol.iterator]() {
    let curr = this.head;

    while (curr !== null) {
      yield curr;
      curr = curr.next;
    }
  }
}