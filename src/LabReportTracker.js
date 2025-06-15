import React, { useState, useMemo } from 'react';
import { Search, Plus, Edit2, Trash2, Calendar } from 'lucide-react';
import './LabReportTracker.css'; // Import the CSS file

const LabReportTracker = () => {
  // Lab parameters from the report
  const labParameters = [
    { name: 'HB', unit: 'g/dL' },
    { name: 'TC', unit: '' },
    { name: 'PLATELET', unit: '/μL' },
    { name: 'SODIUM', unit: 'mEq/L' },
    { name: 'POTASSIUM', unit: 'mEq/L' },
    { name: 'CHLORIDE', unit: 'mEq/L' },
    { name: 'RBS', unit: 'mg/dL' },
    { name: 'UREA', unit: 'mg/dL' },
    { name: 'CREATININE', unit: 'mg/dL' },
    { name: 'CALCIUM', unit: 'mg/dL' },
    { name: 'PHOSPHORUS', unit: 'mg/dL' },
    { name: 'ALBUMIN', unit: 'g/dL' },
    { name: 'PTH', unit: 'pg/mL' },
    { name: 'URIC ACID', unit: 'mg/dL' },
    { name: 'FERRITIN', unit: 'ng/mL' },
    { name: 'IRON', unit: 'μg/dL' },
    { name: 'T.BILIRUBIN', unit: 'mg/dL' },
    { name: 'D.BILIRUBIN', unit: 'mg/dL' },
    { name: 'PROTEIN', unit: 'g/dL' },
    { name: 'SGOT', unit: 'U/L' },
    { name: 'SGPT', unit: 'U/L' },
    { name: 'PHOSPHATASE', unit: 'U/L' },
    { name: 'HIV', unit: '' },
    { name: 'HCV', unit: '' },
    { name: 'HBsAG', unit: '' }
  ];

  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    parameter: '',
    value: '',
    unit: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Filter parameters based on search
  const filteredParameters = useMemo(() => {
    return labParameters.filter(param => 
      param.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleParameterSelect = (param) => {
    setFormData(prev => ({
      ...prev,
      parameter: param.name,
      unit: param.unit
    }));
    setSearchTerm(param.name);
    setDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.parameter || !formData.value || !formData.date) return;

    const newEntry = {
      id: editingId || Date.now(),
      ...formData,
      timestamp: new Date().toISOString()
    };

    if (editingId) {
      setEntries(prev => prev.map(entry => 
        entry.id === editingId ? newEntry : entry
      ));
      setEditingId(null);
    } else {
      setEntries(prev => [...prev, newEntry]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      parameter: '',
      value: '',
      unit: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setSearchTerm('');
    setShowForm(false);
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setSearchTerm(entry.parameter);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="lab-tracker-container">
  {/* Header / AppBar */}
  <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    

    {/* Center Content */}
    <div style={{ textAlign: 'center', flexGrow: 1 }}>
      <div className="hospital-logo">🏥 SPARSH HOSPITAL</div>
      <h2 id="headerTitle">HEMODIALYSIS TREATMENT SYSTEM</h2>
      <p>"THE TOUCH OF LIFE"</p>
    </div>

    {/* Placeholder to balance layout */}
    <div style={{ width: '70px' }} /> {/* Matches Back button size for centering */}
  </div>

  {/* Main Content */}
  <div className="lab-tracker-main">
        {/* Header */}
        <div className="lab-tracker-header">
          <div className="lab-tracker-header-content">
            <div>
              <h1 className="lab-tracker-title">Lab Investigation Report</h1>
              <p className="lab-tracker-subtitle">Track and manage your dialysis lab parameters</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="lab-tracker-add-btn"
            >
              <Plus size={20} />
              Add Entry
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="lab-tracker-modal-overlay">
            <div className="lab-tracker-modal">
              <h2 className="lab-tracker-modal-title">
                {editingId ? 'Edit Entry' : 'Add New Entry'}
              </h2>
              
              <div>
                {/* Parameter Dropdown with Search */}
                <div className="lab-tracker-form-group">
                  <label className="lab-tracker-label">
                    Parameter
                  </label>
                  <div className="lab-tracker-dropdown-container">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setDropdownOpen(true);
                        setFormData(prev => ({ ...prev, parameter: '', unit: '' }));
                      }}
                      onFocus={() => setDropdownOpen(true)}
                      placeholder="Search parameters..."
                      className="lab-tracker-search-input"
                      required
                    />
                    <Search className="lab-tracker-search-icon" size={20} />
                  </div>
                  
                  {dropdownOpen && (
                    <div className="lab-tracker-dropdown">
                      {filteredParameters.map((param, index) => (
                        <div
                          key={index}
                          onClick={() => handleParameterSelect(param)}
                          className="lab-tracker-dropdown-item"
                        >
                          <span className="lab-tracker-dropdown-param">{param.name}</span>
                          {param.unit && <span className="lab-tracker-dropdown-unit">{param.unit}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Value and Unit */}
                <div className="lab-tracker-form-row">
                  <div className="lab-tracker-form-group">
                    <label className="lab-tracker-label">
                      Value
                    </label>
                    <input
                      type="text"
                      value={formData.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                      className="lab-tracker-input"
                      required
                    />
                  </div>
                  <div className="lab-tracker-form-group">
                    <label className="lab-tracker-label">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                      className="lab-tracker-input"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="lab-tracker-form-group">
                  <label className="lab-tracker-label">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="lab-tracker-input"
                    required
                  />
                </div>

                {/* Notes */}
                <div className="lab-tracker-form-group">
                  <label className="lab-tracker-label">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="lab-tracker-textarea"
                    rows="2"
                    placeholder="Additional notes..."
                  />
                </div>

                {/* Buttons */}
                <div className="lab-tracker-btn-group">
                  <button
                    onClick={handleSubmit}
                    className="lab-tracker-btn-primary"
                  >
                    {editingId ? 'Update' : 'Add'} Entry
                  </button>
                  <button
                    onClick={resetForm}
                    className="lab-tracker-btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="lab-tracker-entries">
          <div className="lab-tracker-entries-header">
            <h2 className="lab-tracker-entries-title">Lab Entries</h2>
            <p className="lab-tracker-entries-subtitle">Total entries: {entries.length}</p>
          </div>
          
          {entries.length === 0 ? (
            <div className="lab-tracker-empty-state">
              <Calendar className="lab-tracker-empty-icon" size={48} />
              <p className="lab-tracker-empty-title">No entries yet</p>
              <p className="lab-tracker-empty-subtitle">Add your first lab parameter to get started</p>
            </div>
          ) : (
            <div className="lab-tracker-table-container">
              <table className="lab-tracker-table">
                <thead className="lab-tracker-table-header">
                  <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Date</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="lab-tracker-table-body">
                  {sortedEntries.map((entry) => (
                    <tr key={entry.id} className="lab-tracker-table-row">
                      <td className="lab-tracker-table-cell">
                        <div className="lab-tracker-table-cell-parameter">{entry.parameter}</div>
                      </td>
                      <td className="lab-tracker-table-cell">
                        <div className="lab-tracker-table-cell-value">
                          {entry.value} {entry.unit}
                        </div>
                      </td>
                      <td className="lab-tracker-table-cell lab-tracker-table-cell-date">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="lab-tracker-table-cell">
                        <div className="lab-tracker-table-cell-notes">
                          {entry.notes || '-'}
                        </div>
                      </td>
                      <td className="lab-tracker-table-cell">
                        <div className="lab-tracker-actions">
                          <button
                            onClick={() => handleEdit(entry)}
                            className="lab-tracker-action-btn lab-tracker-edit-btn"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="lab-tracker-action-btn lab-tracker-delete-btn"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <br/>
      {/* 🔙 Back Button on the left */}
    <button
    onClick={() => window.history.back()}
    className="lab-tracker-back-btn"
    style={{
      backgroundColor: '#d0e3ff',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#003366',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }}
  >
    ← Back
  </button>
    </div>
  );
};

export default LabReportTracker;