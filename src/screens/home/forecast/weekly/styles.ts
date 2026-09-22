import {createThemedStyles} from '../../../../utils/theme/createThemedStyles';

export const styles = createThemedStyles(colors => ({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'System',
  },
  forecastContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastDayRow: {
    borderBottomWidth: 0,
  },
  dayText: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontFamily: 'System',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  temperatureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  minTempText: {
    color: colors.text,
    fontSize: 16,
    marginRight: 8,
    fontFamily: 'System',
  },
  maxTempText: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'System',
  },
}));
