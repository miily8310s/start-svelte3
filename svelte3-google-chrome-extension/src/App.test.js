import { render, fireEvent } from '@testing-library/svelte'
import '@testing-library/jest-dom/'
import App from './App.svelte';

test('マークダウン記法ボタンが表示されている', () => {
  const { getByText } = render(App);
  expect(getByText('マークダウン記法')).toBeInTheDocument();
});

test('マークダウン記法ボタンをクリックしたらスクリプトが送り込まれる', () => {
  const executeScriptMock = jest.fn((tabId, inject, callback) => {
    if (!!callback) {
      callback();
    }
  });
  global.chrome = {
    tabs: {
      executeScript: executeScriptMock,
    },
  };
  const { getByText } = render(App);
  const button = getByText('マークダウン記法');
  fireEvent.click(button);
  expect(getByText('クリップボードにコピーしました。')).toBeInTheDocument();
  expect(executeScriptMock).toHaveBeenCalledTimes(2);
  expect(executeScriptMock).toHaveBeenNthCalledWith(
    1,
    null,
    { code: expect.any(String) },
    expect.anything()
  );
  expect(executeScriptMock).toHaveBeenNthCalledWith(2, null, {
    file: 'content_script.js',
  });
});