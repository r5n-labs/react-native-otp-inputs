declare module 'react-native-keyevent' {
  type KeyEventType = {
    action: number;
    pressedKey: string;
    keyCode: number;
  };

  export function onKeyUpListener(callback: (keyEvent: KeyEventType) => void): void;

  export function removeKeyUpListener(): void;
}
