import Get from '../utils/api';

export const GET_UNIT = 'GET_UNIT';
export const GET_NON_PAGING_UNIT = 'GET_NON_PAGING_UNIT';
export const GET_TOTAL_UNIT = 'GET_TOTAL_UNIT';
export const GET_DETAIL_UNIT = 'GET_DETAIL_UNIT';

export function getUnit(data) {
  return {
    type: GET_UNIT,
    data,
  };
}
export function getNonPagingUnit(data) {
  return {
    type: GET_NON_PAGING_UNIT,
    data,
  };
}

export function getTotalUnit(data) {
  return {
    type: GET_TOTAL_UNIT,
    data,
  };
}

export function getDetailUnit(data) {
  return {
    type: GET_DETAIL_UNIT,
    data,
  };
}

export function unitAct({ query = '', isPaging }) {
  return (dispatch) => Get('unit', query).then((data) => {
    dispatch(totalUnitAct())
    if (isPaging) {
      return dispatch(getUnit(data));
    }
    return dispatch(getNonPagingUnit(data));
  });
}

export function detailUnitAct(id) {
  return (dispatch) => Get('unit', id).then((data) => {
    return dispatch(getDetailUnit(data));
  });
}

export function totalUnitAct() {
  return (dispatch) => Get('unit').then((data) => {
    dispatch(getTotalUnit(data.length));
  });
}
