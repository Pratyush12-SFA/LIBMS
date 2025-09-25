import React, { useState, useEffect } from "react";
import "./IssueBookFormModal.css"
import "./IssuedList"

interface Issue {
  issue_Id: number;
  booksId: number;
  issued_Book_Name: string;
  userId: number;
  member_Type: string;
  issue_Date: string;
  return_Date: string;
  over_Due: number;
}

interface IssuedBookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (issue: Issue) => void;
  initialData: Issue;
}

const IssuedBookFormModal: React.FC<IssuedBookFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Issue>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Issued Book</h2>
          <button onClick={onClose} aria-label="Close modal">&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="issued_Book_Name">Book Name:</label>
              <input
                id="issued_Book_Name"
                type="text"
                name="issued_Book_Name"
                value={formData.issued_Book_Name}
                onChange={handleChange}
                placeholder="Enter book name"
                title="Enter the name of the book"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userId">User ID:</label>
              <input
                id="userId"
                type="number"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Enter user ID"
                title="Enter the user ID"
              />
            </div>
            <div className="form-group">
              <label htmlFor="member_Type">Member Type:</label>
              <input
                id="member_Type"
                type="text"
                name="member_Type"
                value={formData.member_Type}
                onChange={handleChange}
                placeholder="Enter member type"
                title="Enter the member type (e.g., Standard, Premium)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="issue_Date">Issue Date:</label>
              <input
                id="issue_Date"
                type="date"
                name="issue_Date"
                value={new Date(formData.issue_Date).toISOString().split('T')[0]}
                onChange={handleChange}
                title="Select the issue date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="return_Date">Return Date:</label>
              <input
                id="return_Date"
                type="date"
                name="return_Date"
                value={new Date(formData.return_Date).toISOString().split('T')[0]}
                onChange={handleChange}
                title="Select the return date"
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssuedBookFormModal;