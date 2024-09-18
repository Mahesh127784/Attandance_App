import Snackbar from 'react-native-snackbar';

export const useSnackbar = (message: string) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    marginBottom: 780,
  });
};
