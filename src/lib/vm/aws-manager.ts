import AWS from 'aws-sdk';
import { VMState } from './types';

export class AWSVMManager {
  private ec2: AWS.EC2;
  private instances: Map<string, string> = new Map(); // agentId -> instanceId

  constructor(config: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  }) {
    AWS.config.update({
      credentials: new AWS.Credentials({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      }),
      region: config.region,
    });

    this.ec2 = new AWS.EC2();
  }

  async startVM(agentId: string): Promise<string> {
    try {
      // Launch a new EC2 instance with our custom AMI
      const result = await this.ec2.runInstances({
        ImageId: 'ami-XXXXXXXX', // Replace with your custom AMI ID
        InstanceType: 't2.medium',
        MinCount: 1,
        MaxCount: 1,
        TagSpecifications: [{
          ResourceType: 'instance',
          Tags: [
            { Key: 'AgentId', Value: agentId },
            { Key: 'Name', Value: `serenity-agent-${agentId}` }
          ]
        }],
        UserData: Buffer.from(this.generateUserData(agentId)).toString('base64')
      }).promise();

      const instanceId = result.Instances?.[0].InstanceId;
      if (!instanceId) throw new Error('Failed to get instance ID');

      this.instances.set(agentId, instanceId);
      return instanceId;
    } catch (error) {
      console.error('Failed to start VM:', error);
      throw error;
    }
  }

  private generateUserData(agentId: string): string {
    return `#!/bin/bash
# Install required packages
apt-get update
apt-get install -y xvfb x11vnc nodejs npm

# Start X virtual framebuffer
Xvfb :99 -screen 0 1920x1080x24 &
export DISPLAY=:99

# Start VNC server
x11vnc -display :99 -forever &

# Install and start our agent software
git clone https://github.com/your-org/serenity-agent
cd serenity-agent
npm install
npm start -- --agent-id=${agentId}
`;
  }

  async stopVM(agentId: string): Promise<void> {
    const instanceId = this.instances.get(agentId);
    if (!instanceId) return;

    try {
      await this.ec2.terminateInstances({
        InstanceIds: [instanceId]
      }).promise();

      this.instances.delete(agentId);
    } catch (error) {
      console.error('Failed to stop VM:', error);
      throw error;
    }
  }

  async getVMState(agentId: string): Promise<VMState> {
    const instanceId = this.instances.get(agentId);
    if (!instanceId) {
      return {
        id: agentId,
        status: 'error',
        currentTask: 'VM not found'
      };
    }

    try {
      const result = await this.ec2.describeInstances({
        InstanceIds: [instanceId]
      }).promise();

      const instance = result.Reservations?.[0]?.Instances?.[0];
      if (!instance) throw new Error('Instance not found');

      return {
        id: agentId,
        status: this.mapEC2State(instance.State?.Name),
        currentTask: 'Running agent tasks',
        cpuUsage: 0, // Would need CloudWatch metrics for actual values
        memoryUsage: 0
      };
    } catch (error) {
      console.error('Failed to get VM state:', error);
      throw error;
    }
  }

  private mapEC2State(state?: string): VMState['status'] {
    switch (state) {
      case 'running': return 'running';
      case 'stopped': return 'idle';
      case 'pending': return 'idle';
      default: return 'error';
    }
  }
}