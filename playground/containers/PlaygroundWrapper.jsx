import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

export default class PlaygroundWrapper extends Component {
  static propTypes = {
    children: PropTypes.any,
    showSelectLang: PropTypes.bool,
    fullWidth: PropTypes.bool,
  };

  static defaultProps = {
    showSelectLang: true,
    fullWidth: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      language: i18next.language,
    };
  }

  @autobind
  onLangChange(e) {
    i18next.changeLanguage(e.target.value);
    this.setState({
      ...this.state,
      language: e.target.value,
    });
  }

  render() {
    const { language } = this.state;

    return (
      <I18nextProvider i18n={ i18next }>
        <If condition={!this.props.fullWidth}>
          <section className="playground-wrapper">
            <If condition={this.props.showSelectLang}>
              <header className="playground-wrapper__header">
                <select onChange={this.onLangChange} value={language}>
                  <option value="en">English</option>
                </select>
              </header>
            </If>

            <div className="playground-wrapper__content">
              {this.props.children}
            </div>
          </section>
        <Else />
          {this.props.children}
        </If>
      </I18nextProvider>

    );
  }
}
