function Delete() {
  //onclick icon for the garbage icon, to make popup appear and apply styles and template literal for message
  // cancel button to go back to main warehouse page
  //delete button to delete item list from db using api
  return (
    <div className="delete">
      <div className="delete__white-box">
        <h1 className="delete__title">Delete ___ warehouse?</h1>
        <p className="delete__description">
          Please confirm that you'd like to delete the ___ from the list of
          warehouses. You won't be able to undo this action.
        </p>
        <div className="delete__btn-box">
          <button className="delete__cancel-btn">Cancel</button>
          <button className="delete__delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
