import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    prn: '',
    subject: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [wardRecords, setWardRecords] = useState([]);
  const [editingWardId, setEditingWardId] = useState(null);
  const [editingWardData, setEditingWardData] = useState({
    name: '',
    prn: '',
    subject: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/wards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit ward details');
      }

      const savedWard = await response.json();
      setSubmittedData(savedWard);
      setMessage('Ward details saved successfully.');
      setFormData({
        name: '',
        prn: '',
        subject: '',
      });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadWardRecords = async () => {
    setIsLoadingRecords(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/wards');

      if (!response.ok) {
        throw new Error('Failed to load ward records');
      }

      const records = await response.json();
      setWardRecords(records);
      setMessage(records.length ? 'Ward records loaded.' : 'No ward records found.');
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  const handleEditClick = (record) => {
    setEditingWardId(record._id);
    setEditingWardData({
      name: record.name,
      prn: record.prn,
      subject: record.subject,
    });
    setMessage('');
    setError('');
  };

  const handleEditingWardChange = (event) => {
    const { name, value } = event.target;

    setEditingWardData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditingWardId(null);
    setEditingWardData({
      name: '',
      prn: '',
      subject: '',
    });
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();

    if (!editingWardId) {
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/wards/${editingWardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingWardData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update ward details');
      }

      const updatedWard = await response.json();

      setWardRecords((currentRecords) =>
        currentRecords.map((record) => (record._id === updatedWard._id ? updatedWard : record))
      );
      setSubmittedData(updatedWard);
      setMessage('Ward details updated successfully.');
      handleCancelEdit();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWard = async (wardId) => {
    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/wards/${wardId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete ward');
      }

      setWardRecords((currentRecords) =>
        currentRecords.filter((record) => record._id !== wardId)
      );

      if (editingWardId === wardId) {
        handleCancelEdit();
      }

      setMessage('Ward deleted successfully.');
    } catch (deleteError) {
      setError(deleteError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="form-card">
        <p className="eyebrow">Student Registration</p>
        <h1>Submit your details</h1>
        <p className="subtitle">Fill in your name, PRN, and subject to register the entry.</p>

        <form className="student-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>

          <label>
            <span>PRN</span>
            <input
              type="text"
              name="prn"
              value={formData.prn}
              onChange={handleChange}
              placeholder="Enter your PRN"
              required
            />
          </label>

          <label>
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter your subject"
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>

        <div className="actions-row">
          <button type="button" className="secondary-button" onClick={loadWardRecords}>
            {isLoadingRecords ? 'Loading...' : 'Load Ward Records'}
          </button>
        </div>

        {(message || error) && (
          <div className={`status-banner ${error ? 'status-error' : 'status-success'}`}>
            {error || message}
          </div>
        )}

        {submittedData && (
          <div className="result-panel">
            <h2>Submitted Details</h2>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>PRN:</strong> {submittedData.prn}</p>
            <p><strong>Subject:</strong> {submittedData.subject}</p>
          </div>
        )}

        <div className="records-panel">
          <h2>Current Wards</h2>
          {wardRecords.length === 0 ? (
            <p className="empty-state">Click Load Ward Records to view the current entries.</p>
          ) : (
            <div className="records-list">
              {wardRecords.map((record) => (
                <article className="record-item" key={record._id}>
                  {editingWardId === record._id ? (
                    <form className="record-edit-form" onSubmit={handleSaveEdit}>
                      <div className="record-header">
                        <h3>Edit Ward</h3>
                        <button
                          type="button"
                          className="icon-button close-button"
                          onClick={handleCancelEdit}
                          aria-label="Cancel edit"
                        >
                          ×
                        </button>
                      </div>

                      <label>
                        <span>Name</span>
                        <input
                          type="text"
                          name="name"
                          value={editingWardData.name}
                          onChange={handleEditingWardChange}
                          required
                        />
                      </label>

                      <label>
                        <span>PRN</span>
                        <input
                          type="text"
                          name="prn"
                          value={editingWardData.prn}
                          onChange={handleEditingWardChange}
                          required
                        />
                      </label>

                      <label>
                        <span>Subject</span>
                        <input
                          type="text"
                          name="subject"
                          value={editingWardData.subject}
                          onChange={handleEditingWardChange}
                          required
                        />
                      </label>

                      <div className="record-actions">
                        <button type="submit" className="save-button" disabled={isSubmitting}>
                          {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                        <button type="button" className="cancel-button" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="record-header">
                        <h3>{record.name}</h3>
                        <div className="record-header-actions">
                          <button
                            type="button"
                            className="icon-button edit-button"
                            onClick={() => handleEditClick(record)}
                            aria-label={`Edit ward ${record.name}`}
                          >
                            ✎
                          </button>
                          <button
                            type="button"
                            className="icon-button delete-button"
                            onClick={() => handleDeleteWard(record._id)}
                            aria-label={`Delete ward ${record.name}`}
                            disabled={isSubmitting}
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                      <p><strong>PRN:</strong> {record.prn}</p>
                      <p><strong>Subject:</strong> {record.subject}</p>
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
