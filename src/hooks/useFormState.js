import { useReducer } from 'react'

function addUrl(file) {
  if(file)
    file.url = URL.createObjectURL(file);
}

const makeInitialState = (schema, values) => {
  const state = {
    values: {},
    touched: {},
    errors: {},
    schema,
  };
  for(let i in schema) {
    const val = values ? values[i] : undefined ;
    state.values[i] = val===undefined ? schema[i].initialValue : val;
    state.touched[i] = false;
  }
  for(let i in schema) {
    state.errors[i] = schema[i].validator ? schema[i].validator(state.values[i], state.values, state.touched) || '' : '';
  }
  return state
}

const reducer = (state, action) => {
  if(action.type==="change") {
    const target = action.target;
    let val;
    if(target.tagName==="INPUT" && (!target.type || target.type==="text" || target.type==='number' || target.type==='date') || target.tagName==="SELECT" || target.tagName==="TEXTAREA" || target.type==='custom')
      val = target.value;
    else if(target.tagName==='ARRAYINPUT')
      val = target.array;
    else if(target.type==="file") {
      val = target.files[0];
      addUrl(val);
    } else if(target.type==='checkbox') {
      val = target.checked;
    }
    const schemaItem = state.schema[target.name];
    const values = schemaItem.setHelper ? schemaItem.setHelper({errors: state.errors, values: state.values, touched: state.touched}, val) : {[target.name]: val};
    const error = schemaItem.validator ? schemaItem.validator(values[target.name], state.values, state.touched) || '' : '';
    return {
      ...state,
      values: {
        ...state.values,
        ...values
      },
      errors: {...state.errors, [target.name]: error},
      touched: {...state.touched, [target.name]: true},
    }
  } else if(action.type==="remove") {
    const value = state.values[action.target.name].filter((_,i) => i!==action.target.index);
    const sch = state.schema[action.target.name];
    const error = sch.validator ? sch.validator(value, state.values, state.touched) || '' : '';
    return {
      ...state,
      values: {...state.values, [action.target.name]: value},
      errors: {...state.errors, [action.target.name]: error},
      touched: {...state.touched, [action.target.name]: true},
    }
  } else if(action.type==="add") {
    const value = [...state.values[action.target.name], action.target.value];
    const sch = state.schema[action.target.name];
    const error = sch.validator ? sch.validator(value, state.values, state.touched) || '' : '';
    return {
      ...state,
      values: {...state.values, [action.target.name]: value},
      errors: {...state.errors, [action.target.name]: error},
      touched: {...state.touched, [action.target.name]: true},
    }
  } else if(action.type==='submit-not-ready') {
    const touched = {};
    for(let i in state.schema) {
      touched[i] = true;
    }
    return { ...state, touched };
  } else if(action.type==='reset') {
    return makeInitialState(state.schema, action.values);
  }
  return state;
}

export default function useFormState({schema, onSubmit}) {
  const [state, dispatch] = useReducer(reducer, schema, makeInitialState);
  const submit = () => {
    for(let i in schema) {
      if(state.errors[i] && state.touched[i]) return;
      else if(state.errors[i]) return dispatch({ type: 'submit-not-ready' });
    }
    onSubmit({ values: state.values, touched: state.touched })
  }
  return { values: state.values, errors: state.errors, touched: state.touched, submit, dispatch };
}
