import { GET_UNIT, GET_NON_PAGING_UNIT, GET_TOTAL_UNIT, GET_DETAIL_UNIT } from '../actions/HomeAction';

export default function getUnit(state = { 
  unit: [], 
  unitNonPaging: [], 
  totalUnit: 1,  
  detailUnit: {
    id: '',
    createdAt: '',
    description: '',
    facilities: [],
    type: '',
    images: {
      primary: '',
      other: []
    },
    address: {
      street: '',
      city: '',
      country: '',
      longitude: '',
      latitude: ''
    },
    name: ''
}
  
}, { type, data }) {
  switch (type) {
    case GET_UNIT:
      return { ...state, unit: data };
    case GET_NON_PAGING_UNIT:
      return { ...state, unitNonPaging: data };
    case GET_TOTAL_UNIT:
      return { ...state, totalUnit: data };
    case GET_DETAIL_UNIT:
      return { ...state, detailUnit: data };
    default:
      return state;
  }
}
