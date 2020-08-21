import React from 'react';
import { clipboardInsert } from '../../lib/utils';
import styles from './style.m.scss';
interface SyntaxProps {
  language?: string;
  width?: string;
  code?: any;
  strong?: boolean;
  allowCopy?: boolean;
  style?: React.CSSProperties;
}

interface SyntaxState {
  copyMsg: string;
}
export default class Syntax extends React.Component<SyntaxProps, SyntaxState> {
  private id = `syntax-${(Math.random() * 1000).toFixed(0)}`;

  constructor(props) {
    super(props);
    this.state = {
      copyMsg: 'Copy',
    };
  }
  copyCode = () => {
    clipboardInsert(JSON.stringify(this.props.code, null, 2));
    this.setState({ copyMsg: 'Copied!' }, () => {
      setTimeout(() => {
        this.setState({ copyMsg: 'Copy' });
      }, 1000);
    });
  }

  renderCode = (code) => {
    if (this.props.language === 'json' && typeof code === 'object') {
      return JSON.stringify(code, null, 2 )
      .replace(/( *)(".+") *:/g, '$1<span class="key">$2</span>:')
      .replace(/: *(".+")/g, ': <span class="string">$1</span>')
      .replace(/: *([0-9]+(\.[0-9]+)?)/g, ': <span class="number">$1</span>')
      .replace(/: *(null|true|false)/g, ': <span class="bool">$1</span>');
    }
    if (typeof code === 'string') {
      return code;
    }
    return JSON.stringify(code);
  }
  public render() {
    return (
      <main className={styles.syntaxContainer} style={{ width: this.props.width, ...this.props.style }}>
        <section
          id={this.id}
          className={`${this.props.strong ? styles.syntaxStrongBg : styles.syntax} ${this.props.language ? 'syntax-' + this.props.language : ''}`}
          dangerouslySetInnerHTML={{ __html: this.renderCode(this.props.code) }}
        ></section>
        {this.props.allowCopy && <button className={styles.copyCodeButton} type='button' onClick={this.copyCode}>{this.state.copyMsg}</button>}
      </main>
    );
  }
}