import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Timer from "./";

describe("Timer Component", () => {
  it("It renders the component", () => {
    const wrapper = shallow(<Timer time="30" />);
    expect(wrapper.find(".timer")).to.have.lengthOf(1);
  });

  it("It renders the time digits if time is positive (>0)", () => {
    const wrapper = shallow(<Timer time="15" />);
    expect(wrapper.find(".timer-digits").text()).to.equal(" 15 seconds");
  });

  it("It renders a time expired message if time is zero (=0)", () => {
    const wrapper = shallow(<Timer time="0" />);
    expect(wrapper.find(".timer-digits").text()).to.equal(" time has expired");
  });

  it("It renders a time expired message if time is negative (<0)", () => {
    const wrapper = shallow(<Timer time="-15" />);
    expect(wrapper.find(".timer-digits").text()).to.equal(" time has expired");
  });
});
