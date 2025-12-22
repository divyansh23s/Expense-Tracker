import { useState } from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";
import { PeopleIcon, PlusIcon, EmptyIcon, EditIcon, DeleteIcon, SaveIcon, CancelIcon } from "./UI/Icons";

export default function PeopleList({ people, onAddPerson, onUpdatePerson, onDeletePerson }) {
  const [editingPerson, setEditingPerson] = useState(null);
  const [editName, setEditName] = useState("");
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");

  function handleAddPerson() {
    setIsAdding(true);
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const name = newPersonName.trim();
    
    if (!name) {
      setError("Name is required");
      return;
    }
    
    if (people.includes(name)) {
      setError("Person with this name already exists");
      return;
    }
    
    onAddPerson(name);
    setNewPersonName("");
    setIsAdding(false);
    setError("");
  }


  function handleCancel() {
    setIsAdding(false);
    setNewPersonName("");
    setError("");
  }

  function handleEditPerson(personName) {
    setEditingPerson(personName);
    setEditName(personName);
    setError("");
  }

  function handleSaveEdit() {
    if (!editName.trim()) {
      setError("Name is required");
      return;
    }

    if (people.includes(editName.trim()) && editName.trim() !== editingPerson) {
      setError("Person with this name already exists");
      return;
    }

    const success = onUpdatePerson(editingPerson, editName.trim());
    if (success) {
      setEditingPerson(null);
      setEditName("");
      setError("");
    } else {
      setError("Failed to update person name");
    }
  }

  function handleCancelEdit() {
    setEditingPerson(null);
    setEditName("");
    setError("");
  }

  function handleDeletePerson(personName) {
    if (window.confirm(`Are you sure you want to delete ${personName}?`)) {
      const result = onDeletePerson(personName);
      if (!result.success) {
        setError(result.error);
      }
    }
  }

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <PeopleIcon className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">People</h3>
      </div>

      {people.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <EmptyIcon className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-lg mb-2">No people added yet</p>
          <p className="text-sm">Add people to start splitting expenses</p>
        </div>
      ) : (

        <ul className="space-y-3">
          {people.map(person => (
            <li
              key={person}
              className="flex items-center gap-3 text-slate-700"
            >
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium">
                {editingPerson === person ? editName[0] : person[0]}
              </div>
              
              {editingPerson === person ? (
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-1"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                    title="Save"
                  >
                    <SaveIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                    title="Cancel"
                  >
                    <CancelIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-medium flex-1">{person}</span>
                  <button
                    onClick={() => handleEditPerson(person)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Edit"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePerson(person)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <DeleteIcon className="w-4 h-4" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {!isAdding ? (
        <button 
          onClick={handleAddPerson}
          className="mt-6 w-full flex items-center justify-center gap-2 text-primary border border-primary rounded-xl py-2 hover:bg-emerald-50 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add Person
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="text"
            placeholder="Enter person name"
            value={newPersonName}
            onChange={e => setNewPersonName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Add
            </Button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </Card>
  );
}
