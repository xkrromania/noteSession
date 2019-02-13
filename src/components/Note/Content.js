import React from "react";

const Content = ({ content }) => {
  const hasContent = content.length > 0;
  const ContentRender = hasContent && (
    <div className="content">
      <h2>Latest Note</h2>
      <article>{content}</article>
    </div>
  );

  const BlankStateRender = !hasContent && (
    <div className="blank-state">
      <h2>Note Session</h2>
      <p>
        An app for moving what you just learned to Long Term Memory by using the
        30seconds rule. A bit more detailed, you can customize the time in
        seconds to write down the most important things that you remembered from
        what you just watched, read or anything in between.
        <br />
        <a
          href="https://medium.com/swlh/the-30-second-habit-with-a-lifelong-impact-2c3f948ead98"
          title="Medium Article"
          target="_blank"
          rel="noopener noreferrer"
        >
          Inspired from the 30 Seconds Habit &#10064;
        </a>
      </p>
    </div>
  );

  return (
    <>
      {ContentRender}
      {BlankStateRender}
    </>
  );
};

export default Content;
