import {createThemedStyles} from '../../../../utils/theme/createThemedStyles';

export const styles = createThemedStyles(colors => ({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'System',
  },
  forecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  hourItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 12,
  },
  timeText: {
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'System',
  },
  tempText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    fontFamily: 'System',
  },
  windContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  windIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  windText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'System',
  },
  precipitationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  umbrellaIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  precipitationText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'System',
  },
}));
