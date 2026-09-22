import {createThemedStyles} from '../../../utils/theme/createThemedStyles';

export const styles = createThemedStyles(colors => ({
  container: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  temperature: {
    fontSize: 80,
    fontWeight: 'bold',
    color: colors.secondary,
    fontFamily: 'System',
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  condition: {
    fontSize: 20,
    color: colors.placeholderText,
    marginLeft: 8,
    fontFamily: 'System',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    width: '80%',
    marginVertical: 16,
  },
  minMaxTemp: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: 'System',
  },
}));
