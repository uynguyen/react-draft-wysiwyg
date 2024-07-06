import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.css";

class Mention {
  constructor(config) {
    this.className = config.className;
    this.component = config.component;
  }
  getMentionComponent = () => {
    const className = this.className;
    const MentionComponent = ({ entityKey, children, contentState }) => {
      const { url, value } = contentState.getEntity(entityKey).getData();
      return (
        <a
          href={url || value}
          className={classNames("rdw-mention-link", className)}
        >
          {children}
        </a>
      );
    };
    MentionComponent.propTypes = {
      entityKey: PropTypes.number,
      children: PropTypes.array,
      contentState: PropTypes.object,
    };
    return MentionComponent;
  };
  getMentionDecorator = () => {
    console.log(`Render with comp `, this.component);
    return {
      strategy: this.findMentionEntities,
      component: this.component ? this.component() : this.getMentionComponent(),
    };
  };
}

Mention.prototype.findMentionEntities = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "MENTION"
    );
  }, callback);
};

export default Mention;
