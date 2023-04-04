import { Commands } from './commands';
import { removeStopWords } from './stopWordsRemover';

export function transformInput(
  input: string,
  isValid: boolean
): { transformedInput: object; isValid: boolean } {
  const inputWords = removeStopWords(input);
  inputWords[0] = inputWords[0]?.toUpperCase();
  const action = inputWords[0]?.toUpperCase();
  let transformedInput = {};

  switch (action) {
    case Commands.NAVIGATE:
      // validate if the input is of the form "navigate <route>"
      if (inputWords.length !== 2) {
        transformedInput = {};
        isValid = false;
        break;
      }

      // regex of the form "navigate "route""
      let regex = /NAVIGATE "(?:[^"]|"")*"/i;
      if (!regex.test(inputWords.join(' '))) {
        transformedInput = {};
        isValid = false;
        break;
      }

      transformedInput = {
        action: Commands.NAVIGATE,
        value: {value:inputWords[1].replace(/"/g, '')}
      };
      isValid = true;

      break;
    case Commands.CLICK:
      if (inputWords.length !== 2) {
        transformedInput = {};
        isValid = false;
        break;
      }

      let clickRegex = /CLICK "(?:[^"]|"")*"/i;
      if (!clickRegex.test(inputWords.join(' '))) {
        transformedInput = {};
        isValid = false;
        break;
      }

      transformedInput = {
        action: Commands.CLICK,
        value: {value:inputWords[1].replace(/"/g, '')}
      };
      isValid = true;
      break;
    case Commands.WRITE:
      if (inputWords.length !== 3) {
        transformedInput = {};
        isValid = false;
        break;
      }

      // regex of the form 'WRITE "text" "selector"'
      let writeRegex = /WRITE "(?:[^"]|"")*" "(?:[^"]|"")*"/i;
      console.log(writeRegex.test(inputWords.join(' ')));
      if (!writeRegex.test(inputWords.join(' '))) {
        transformedInput = {};
        isValid = false;
        break;
      }

      transformedInput = {
        action: Commands.WRITE,
        value: {value:inputWords[2].replace(/"/g, ''),data:inputWords[1].replace(/"/g, '')}
      };
      isValid = true;
      break;

    case Commands.ASSERT:
      if (inputWords.length !== 3) {
        transformedInput = {};
        isValid = false;
        break;
      }

      // regex of the form 'ASSERT "value" "type"'
      let assertRegex = /ASSERT "(?:[^"]|"")*" "(?:[^"]|"")*"/i;
      if (!assertRegex.test(inputWords.join(' '))) {
        transformedInput = {};
        isValid = false;
        break;
      }

      transformedInput = {
        action: Commands.ASSERT,
        value: {value:inputWords[1].replace(/"/g, ''),type:inputWords[2].replace(/"/g, '')}
      };
      isValid = true;
      break;




    default:
      transformedInput = {};
      isValid = false;
      break;
  }

  if (!isValid) {
    return { transformedInput: {}, isValid: false };
  } else {
    return { transformedInput, isValid };
  }
}

export function transformStep(command: any) {
  const action = command.action;
  let commandString = '';

  switch (action) {
    case Commands.NAVIGATE:
      commandString = `${action} "${command.value.value}"`;
      break;
    case Commands.CLICK:
      commandString = `${action} "${command.value.value}"`;
      break;
    case Commands.WRITE:
      commandString = `${action} "${command.value.data}" into "${command.value.value}"`;
      break;
    case Commands.ASSERT:
      commandString = `${action} "${command.value.value}"  "${command.value.type}"`;
      break;
    default:
      commandString = ``;
      break;
  }

  return commandString;
}
