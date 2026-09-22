import {createThemedStyles} from '../../../utils/theme/createThemedStyles';

export const styles = createThemedStyles(colors => ({
  imgContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  searchCityText: {
    color: colors.text,
    fontSize: 16,
    marginTop: 16,
  },
  emptyImg: {
    height: 320,
    width: 320,
    resizeMode: 'contain',
    marginTop: 20,
    alignSelf: 'center',
  },
}));
