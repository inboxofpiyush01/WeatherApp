import {createThemedStyles} from '../../utils/theme/createThemedStyles';

export const styles = createThemedStyles(colors => ({
  container: {
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
  },
}));
