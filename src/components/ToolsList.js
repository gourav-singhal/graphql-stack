import React, { Component } from "react";
import Tool from "./Tool";

const extractLanguages = tools =>
  tools.reduce((acc, { language }) => {
    acc.add(language);
    return acc;
  }, new Set());

const sortLanguages = languages => Array.from(languages).sort();

const sortTools = tools => tools.sort((a, b) => a.name > b.name);

class LanguageSelector extends Component {
  handleChange = ({ target }) => {
    this.props.onSelect(target.value);
  };

  render() {
    const { languages, selected } = this.props;
    return (
      <select name="language" value={selected} onChange={this.handleChange}>
        {languages.map((language, i) => <option key={i}>{language}</option>)}
      </select>
    );
  }
}

class ToolsList extends Component {
  state = {
    language: "javascript"
  };

  render() {
    const { type } = this.props;
    let { tools } = this.props;
    let languageSelector = null;

    if (type === "graphqlServer") {
      const languages = sortLanguages(extractLanguages(tools));
      tools = tools.filter(({ language }) => language === this.state.language);
      languageSelector = (
        <LanguageSelector
          languages={languages}
          selected={this.state.language}
          onSelect={language => this.setState({ language })}
        />
      );
    }

    tools = sortTools(tools);

    return (
      <div className="toolsList">
        {languageSelector}
        <div className="tools">
          {tools.map((data, i) => <Tool data={data} key={i} />)}
        </div>
      </div>
    );
  }
}

export default ToolsList;
