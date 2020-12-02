import React, { Component } from "react";
import DataContext from "../contexts/DataContext";

class Grandchild extends Component {
  // Update the Context. If you recall from Step 2, this is
  // actually just calling this.setState() on our Provider!
  handleClick() {
    this.context.update({ center: { lat: 7.93197, lng: 79.85775 } });
  }

  // Call `handleClick` when the user clicks the component.
  render() {
    return (
      <div onClick={() => this.handleClick()}>
        {this.context.x}, {this.context.y}
      </div>
    );
  }
}

Grandchild.contextType = DataContext;

export default Grandchild;
