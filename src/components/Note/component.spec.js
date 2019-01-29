import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";

import Note from "./component";

describe("Note Component", () => {
  it("It renders the component", () => {
    const wrapper = shallow(<Note content="test" />);
    expect(wrapper.find(".note")).to.have.lengthOf(1);
  });
});
