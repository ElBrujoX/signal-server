import express from 'express';
import cors from 'cors';
import { VMManager } from '../lib/vm/vm-manager';

const app = express();
const port = 3000;
const vmManager = new VMManager();

app.use(cors());
app.use(express.json());

// Get all VMs
app.get('/api/vms', (req, res) => {
  const vms = vmManager.getAllVMs();
  res.json(vms);
});

// Get specific VM
app.get('/api/vms/:id', (req, res) => {
  const vm = vmManager.getVM(req.params.id);
  if (!vm) {
    res.status(404).json({ error: 'VM not found' });
    return;
  }
  res.json(vm);
});

// Update VM state
app.patch('/api/vms/:id/state', (req, res) => {
  const { id } = req.params;
  const state = req.body;
  
  vmManager.updateVMState(id, state);
  const updatedVM = vmManager.getVM(id);
  
  res.json(updatedVM);
});

// Update stream stats
app.patch('/api/vms/:id/stream', (req, res) => {
  const { id } = req.params;
  const stats = req.body;
  
  vmManager.updateStreamStats(id, stats);
  const updatedVM = vmManager.getVM(id);
  
  res.json(updatedVM);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});