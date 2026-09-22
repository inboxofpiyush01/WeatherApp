import {createThemedStyles} from '../../../utils/theme/createThemedStyles';

export const styles = createThemedStyles(colors => ({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: 'System',
  },
  dayLabel: {
    fontSize: 18,
    color: colors.placeholderText,
    marginTop: 4,
    fontFamily: 'System',
  },
}));
