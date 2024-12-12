import { EventEmitter } from 'events';

export interface Command {
  type: 'cli' | 'gui' | 'voice';
  action: string;
  parameters: Record<string, any>;
}

export class CommandInterface extends EventEmitter {
  private commandHistory: Command[] = [];

  async executeCommand(command: Command): Promise<boolean> {
    try {
      this.commandHistory.push(command);
      this.emit('commandExecuted', { command, timestamp: new Date() });
      return true;
    } catch (error) {
      this.emit('error', error);
      return false;
    }
  }

  async getCommandLogs(): Promise<Command[]> {
    return this.commandHistory;
  }

  async clearCommandHistory(): Promise<boolean> {
    try {
      this.commandHistory = [];
      this.emit('historyCleared', { timestamp: new Date() });
      return true;
    } catch (error) {
      this.emit('error', error);
      return false;
    }
  }
}