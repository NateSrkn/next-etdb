import React from "react";

const DynamicInfo = ({ sections }) => {
  const createDynamicElements = ({
    wrapper = { tag: "div", attributes: null },
    section,
  }) => {
    wrapper = {
      tag: "div",
      attributes: null,
      ...wrapper,
    };
    const Container = wrapper.tag;

    return (
      <Container {...wrapper.attributes}>
        <React.Fragment>
          {section
            .sort((a, b) => a.order - b.order)
            .map((ele, index) => {
              const {
                title,
                key,
                html: { tag: Component, attributes, value },
              } = ele;
              if (value) {
                return (
                  <div
                    style={{ display: "inline-flex", flexDirection: "column" }}
                    key={ele.toString() + index}
                  >
                    {title && <h4>{title}</h4>}
                    <Component {...attributes}>
                      {key ? value[key] : value}
                    </Component>
                  </div>
                );
              }
            })}
        </React.Fragment>
      </Container>
    );
  };

  const sectionsHtml = Object.keys(sections)
    .sort((a, b) => a - b)
    .map((key) => createDynamicElements(sections[key]));

  return (
    <React.Fragment>
      {sectionsHtml.map((section) => React.Children.toArray(section))}
    </React.Fragment>
  );
};

export default DynamicInfo;
