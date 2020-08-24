import React, { useCallback, useState } from 'react';
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

const Syntax = ({
  code,
  language,
  width,
  strong,
  allowCopy,
  style,
}: SyntaxProps) => {
  const [copyMsg, setCopyMsg] = useState('Copy');

  const copyCode = useCallback(() => {
    clipboardInsert(JSON.stringify(code, null, 2));
    setCopyMsg('Copied!');
    setTimeout(() => setCopyMsg('Copy'), 1000);
  }, [copyMsg]);

  return (
    <main className={styles.syntaxContainer} style={{ width: width, ...style }}>
      <section
        className={`${strong ? styles.syntaxStrongBg : styles.syntax} ${
          language ? 'syntax-' + language : ''
        }`}
        dangerouslySetInnerHTML={{
          __html: stringifyCode(code, language),
        }}
      ></section>
      {allowCopy && (
        <button
          className={styles.copyCodeButton}
          type='button'
          onClick={copyCode}
        >
          {copyMsg}
        </button>
      )}
    </main>
  );
};

export default Syntax;

const stringifyCode = (code: object, language?: string) => {
  if (language === 'json' && typeof code === 'object') {
    return JSON.stringify(code, null, 2)
      .replace(/( *)(".+") *:/g, '$1<span class="key">$2</span>:')
      .replace(/: *(".+")/g, ': <span class="string">$1</span>')
      .replace(/: *([0-9]+(\.[0-9]+)?)/g, ': <span class="number">$1</span>')
      .replace(/: *(null|true|false)/g, ': <span class="bool">$1</span>');
  }
  if (typeof code === 'string') {
    return code;
  }
  return JSON.stringify(code);
};
