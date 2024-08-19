import React, { useState } from 'react';

const ReportDialog = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (reason: string, description: string) => void }) => {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(reason, description);
    onClose(); // Close the dialog after submission
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h3>Report Comment</h3>
        <div className="form-group">
          <label>Reason</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)} className="form-control">
            <option value="">Select a reason</option>
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
            <option value="hate_speech">Hate Speech</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder="Provide additional details..."
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit Report
        </button>
        <button onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReportDialog;
