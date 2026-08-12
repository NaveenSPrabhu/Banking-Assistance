const branchService = require('../services/branchService');

const list = async (req, res) => {
  try {
    const branches = await branchService.listBranches();
    res.json({ success: true, branches });
  } catch (error) {
    console.error('LIST BRANCHES ERROR:', error);
    res.status(500).json({ success: false, message: 'Unable to load branches.' });
  }
};

const create = async (req, res) => {
  try {
    const branch = await branchService.createBranch(req.body);
    res.status(201).json({ success: true, message: 'Branch created successfully.', branch });
  } catch (error) {
    console.error('CREATE BRANCH ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const branch = await branchService.updateBranch(req.params.id, req.body);
    res.json({ success: true, message: 'Branch updated successfully.', branch });
  } catch (error) {
    console.error('UPDATE BRANCH ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const toggle = async (req, res) => {
  try {
    const branch = await branchService.toggleBranch(req.params.id);
    res.json({ success: true, message: 'Branch status updated.', branch });
  } catch (error) {
    console.error('TOGGLE BRANCH ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const branch = await branchService.verifyBranch(req.body.branchCode, req.user.id);
    res.json({ success: true, message: 'Branch verified successfully.', branch });
  } catch (error) {
    console.error('VERIFY BRANCH ERROR:', error);
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = { list, create, update, toggle, verify };
