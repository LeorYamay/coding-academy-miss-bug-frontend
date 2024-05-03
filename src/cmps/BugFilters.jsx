import React, { useState, useEffect } from "react";

export function BugFilters({ filterBy, onSetFilterBy }) {
  const [internalFilterBy, setInternalFilterBy] = useState(filterBy);

  useEffect(() => {
    setInternalFilterBy(filterBy);
  }, [filterBy]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInternalFilterBy((prevFilterBy) => ({
      ...prevFilterBy,
      [name]: value
    }));
  }

  function applyFilters() {
    onSetFilterBy(internalFilterBy);
  }

  return (
    <div className="filters">
      <div>Filter</div>
      <label>
        Created After:
        <input
          type="date"
          name="createdAfter"
          value={internalFilterBy.createdAfter}
          onChange={handleInputChange}
          onBlur={applyFilters} // Apply filters when input loses focus
        />
      </label>
      <label>
        Created Before:
        <input
          type="date"
          name="createdBefore"
          value={internalFilterBy.createdBefore}
          onChange={handleInputChange}
          onBlur={applyFilters} // Apply filters when input loses focus
        />
      </label>
      <label>
        Min Severity:
        <input
          type="number"
          name="minSeverity"
          value={internalFilterBy.minSeverity}
          onChange={handleInputChange}
          onBlur={applyFilters} // Apply filters when input loses focus
        />
      </label>
      <label>
        Max Severity:
        <input
          type="number"
          name="maxSeverity"
          value={internalFilterBy.maxSeverity}
          onChange={handleInputChange}
          onBlur={applyFilters} // Apply filters when input loses focus
        />
      </label>
      <label>
        Search:
        <input
          type="text"
          name="txt"
          value={internalFilterBy.txt}
          onChange={handleInputChange}
          onBlur={applyFilters} // Apply filters when input loses focus
        />
      </label>
    </div>
  );
}
