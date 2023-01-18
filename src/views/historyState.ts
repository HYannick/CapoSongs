export type HistoryState = {
  player: boolean;
  home: boolean;
  settings: boolean;
  favourite: boolean;
  filters: boolean;
  details: boolean;
};

export const historyState: HistoryState = {
  player: false,
  home: true,
  settings: false,
  favourite: false,
  filters: false,
  details: false,
};

export const setNewState = (newState: Partial<HistoryState>) => ({
  ...historyState,
  ...newState,
});
