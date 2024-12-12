export * from './desktop';
export * from './browser';
export * from './content-creator';
export * from './streaming';
export * from './voice';
export * from './collaboration';
export * from './command';

// Main agent class that combines all capabilities
import { DesktopController } from './desktop';
import { WebBrowser } from './browser';
import { ContentCreator } from './content-creator';
import { StreamController } from './streaming';
import { VoiceSynthesizer } from './voice';
import { CollaborationManager } from './collaboration';
import { CommandInterface } from './command';

export class SerenityAgent {
  desktop: DesktopController;
  browser: WebBrowser;
  content: ContentCreator;
  stream: StreamController;
  voice: VoiceSynthesizer;
  collaboration: CollaborationManager;
  command: CommandInterface;

  constructor(voiceConfig: Parameters<typeof VoiceSynthesizer>[0]) {
    this.desktop = new DesktopController();
    this.browser = new WebBrowser();
    this.content = new ContentCreator();
    this.stream = new StreamController();
    this.voice = new VoiceSynthesizer(voiceConfig);
    this.collaboration = new CollaborationManager();
    this.command = new CommandInterface();
  }
}