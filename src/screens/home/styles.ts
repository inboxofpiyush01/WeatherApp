import {createThemedStyles} from '../../utils/theme/createThemedStyles';

export const styles = createThemedStyles(colors => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
    flexGrow: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  loadingText: {
    color: colors.text,
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: colors.text,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  textInput: {
    backgroundColor: colors.background,
    color: colors.text,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: '80%',
  },
  searchBtn: {
    backgroundColor: colors.card,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchText: {
    color: colors.text,
  },
}));
