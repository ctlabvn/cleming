export const PrivateMethods = {
  captureReferenceFor(cellData, sectionId, rowId, row) {
    if (cellData[sectionId] === undefined) {
      cellData[sectionId] = {};
    }

    cellData[sectionId][rowId] = row; // Capture the reference
  },

  /**
   * Go through the changed rows and update the cell with their new visibility state
   */
  updateCellsVisibility(cellData, visibleRows, changedRows) {
    // update changed rows
    for (const section in changedRows) {
      if (changedRows.hasOwnProperty(section)) { // Good JS hygiene check
        const currentSection = changedRows[section];

        for (const row in currentSection) {
          if (currentSection.hasOwnProperty(row)) { // Good JS hygiene check
            const currentCell = cellData[section][row];
            const currentCellVisibility = currentSection[row];

            // Set the cell's new visibility state
            if (currentCell && currentCell.setVisibility) {
              currentCell.setVisibility(currentCellVisibility);
            }
          }
        }
      }
    }

    // set visible rows visible, see https://github.com/sghiassy/react-native-sglistview/issues/12
    for (const section in visibleRows) {
      if (visibleRows.hasOwnProperty(section)) { // Good JS hygiene check
        const currentSection = visibleRows[section];

        for (const row in currentSection) {
          if (currentSection.hasOwnProperty(row)) { // Good JS hygiene check
            const currentCell = cellData[section][row];

            // Set the cell visible
            if (currentCell && currentCell.setVisibility) {
              currentCell.setVisibility(true);
            }
          }
        }
      }
    }
  },

  /**
   * Calculate and return the cell dimensions for the given cell (position and size)
   */
  calculateDimensionsForCell(cellData, childFrames, sectionID, rowID, horizontal, index) {
    const row = cellData[sectionID];
    if (!row) {
      throw new Error(`sectionID not found ${sectionID}`);
    }
    const cell = row[rowID];
    if (!cell) {
      throw new Error(`rowID not found ${rowID}`);
    }
    let x = 0;
    let y = 0;

    const width = cell.viewProperties.width;
    const height = cell.viewProperties.height;
    if (childFrames.length) {
      const childFrame = childFrames[childFrames.length - 1];
      if (horizontal) {
        x = childFrame.x + childFrame.width;
      } else {
        y = childFrame.y + childFrame.height;
      }
    }
    return { x, y, width, height, index };
  },

  /**
   * When the user is scrolling up or down - load the cells in the future to make it
   * so the user doesn't see any flashing
   */
  updateCellsPremptively(props, cellData, visibleRows) {
    if (!props.premptiveLoading) {
      return; // No need to run is preemptive loading is 0 or false
    }

    if (!cellData.premptiveLoadedCells) {
      cellData.premptiveLoadedCells = [];
    }

    // Get the first and last visible rows
    let firstVisibleRow;
    let lastVisibleRow;
    let firstVisibleSection;
    let lastVisibleSection;

    for (const section in visibleRows) {
      if (visibleRows.hasOwnProperty(section)) { // Good JS hygiene check
        for (const row in visibleRows[section]) {
          if (firstVisibleRow === undefined) {
            firstVisibleSection = section;
            firstVisibleRow = Number(row);
          } else {
            lastVisibleSection = section;
            lastVisibleRow = Number(row);
          }

          /*
           * Dont consider a cell preemptiveloaded if it is touched by default visibility logic.
           */
          const currentCell = cellData[section][row];
          if (cellData.premptiveLoadedCells) {
            const i = cellData.premptiveLoadedCells.indexOf(currentCell);
            if (i >= 0) {
              cellData.premptiveLoadedCells.splice(i, 1);
            }
          }
        }
      }
    }

    // Figure out if we're scrolling up or down
    const isScrollingUp = cellData.firstVisibleRow > firstVisibleRow;
    const isScrollingDown = cellData.lastVisibleRow < lastVisibleRow;

    let scrollDirectionChanged;
    if (isScrollingUp && cellData.lastScrollDirection === 'down') {
      scrollDirectionChanged = true;
    } else if (isScrollingDown && cellData.lastScrollDirection === 'up') {
      scrollDirectionChanged = true;
    }

    // remove the other side's preemptive cells
    if (scrollDirectionChanged) {
      let cell = cellData.premptiveLoadedCells.pop();

      while (cell != undefined) {
        cell.setVisibility(false);
        cell = cellData.premptiveLoadedCells.pop();
      }
    }

    // Preemptively set cells
    for (let i = 1; i <= props.premptiveLoading; i++) {
      let cell;

      if (isScrollingUp) {
        cell = cellData[firstVisibleSection][firstVisibleRow - i];
      } else if (isScrollingDown) {
        cell = cellData[lastVisibleSection][lastVisibleRow + i];
      }

      if (cell) {
        cell.setVisibility(true);
        cellData.premptiveLoadedCells.push(cell);
      } else {
        break;
      }
    }

    cellData.firstVisibleRow = firstVisibleRow; // cache the first seen row
    cellData.lastVisibleRow = lastVisibleRow; // cache the last seen row

    if (isScrollingUp) {
      cellData.lastScrollDirection = 'up';
    } else if (isScrollingDown) {
      cellData.lastScrollDirection = 'down';
    }
  },
};