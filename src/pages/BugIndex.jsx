import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BugList } from "../cmps/BugList.jsx";
import { useState, useEffect, useCallback } from "react";

import { bugService } from "../services/bug.service.js";
import { utilService } from "../services/util.service.js";
import { userService } from "../services/user.service.js";
import { BugFilters } from "../cmps/BugFilters.jsx";

export function BugIndex() {
  const [bugs, setBugs] = useState([]);
  const [filterBy, setFilterBy] = useState({ pageIdx: 0 });
  const loggedinUser = userService.getLoggedinUser();
  const debouncedOnSetFilterBy = useCallback(
    utilService.debounce(onSetFilterBy, 1000),
    []
  );
  const bugsPerPage = 4; //magic number

  useEffect(() => {
    loadBugs();
  }, [filterBy]);

  async function loadBugs() {
    const bugs = await bugService.query(filterBy);
    setBugs(bugs);
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId);
      console.log("Deleted Successfully!");
      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== bugId));
      showSuccessMsg("Bug removed");
    } catch (err) {
      console.log("Error from onRemoveBug ->", err);
      showErrorMsg("Cannot remove bug");
    }
  }

  async function onAddBug() {
    const bug = {
      title: prompt("Bug title?"),
      description: prompt("Bug description?"),
      severity: +prompt("Bug severity?"),
      creator: { _id: loggedinUser._id, fullname: loggedinUser.fullname },
      createdAt: Date.now(),
    };
    try {
      const savedBug = await bugService.save(bug);
      console.log("Added Bug", savedBug);
      setBugs((prevBugs) => [...prevBugs, savedBug]);
      showSuccessMsg("Bug added");
    } catch (err) {
      console.log("Error from onAddBug ->", err);
      showErrorMsg("Cannot add bug");
    }
  }

  async function onEditBug(bug) {
    const severity = +prompt("New severity?");
    const description = +prompt("New description?");
    const bugToSave = { ...bug, severity, description };
    try {
      const savedBug = await bugService.save(bugToSave);
      console.log("Updated Bug:", savedBug);
      setBugs((prevBugs) =>
        prevBugs.map((currBug) =>
          currBug._id === savedBug._id ? savedBug : currBug
        )
      );
      showSuccessMsg("Bug updated");
    } catch (err) {
      console.log("Error from onEditBug ->", err);
      showErrorMsg("Cannot update bug");
    }
  }

  return (
    <main className="bug-index">
      <h3>Bugs App</h3>
      <BugFilters filterBy={filterBy} onSetFilterBy={debouncedOnSetFilterBy} />
      <main>
        <button className="add-btn" onClick={onAddBug}>
          Add Bug ⛐
        </button>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </main>
  );
}
