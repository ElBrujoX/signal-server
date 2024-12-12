type EventCallback = (...args: any[]) => void;

export class BrowserEventEmitter {
  private events: { [key: string]: EventCallback[] } = {};

  on(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return this;
  }

  emit(event: string, ...args: any[]) {
    const callbacks = this.events[event] || [];
    callbacks.forEach(callback => callback(...args));
    return this;
  }

  off(event: string, callback: EventCallback) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
    return this;
  }
}