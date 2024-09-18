import {Alert} from 'react-native';
import {DELETE} from '../utils/constants';

export const useReconfirmation = (message: string, action: Function) => {
  Alert.alert(
    '',
    message,
    [
      {
        text: 'Cancel',
      },
      {
        text: DELETE,
        onPress: () => action(),
      },
    ],
    {cancelable: true},
  );
};
