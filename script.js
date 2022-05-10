class State {
  constructor(isFinal, state_value, input) {
    this.isFinal = isFinal;
    this.state_value = state_value;
    this.input = input;
  }
}

// intializing the states

let states = [];
let trace = [];
const accept_destination = document.querySelector('.accept-destination');

// checking the intial state

function find_init(testString) {
// no need for loop here
  for (let j = 0; j < states[0].input.length; j++) {
    if (testString[0] == states[0].input[j].input) {
      // add item to trace table
      trace.push({ state: states[0].state_value, input: testString[j] });
      break;
    } else {
      console.log("unexpected input");
    }
  }
}

function find_rest(testString) {
  for (let i = 0; i < testString.length; i++) {


    let currentState = states.filter(
      (state) => state.state_value == trace[trace.length - 1].state
    )[0];

    let currentInput = testString[i];
    let nextStateId;
    currentState.input.forEach((input) => {
      if (input.input == currentInput) {
        nextStateId = input.destination;
      }
    });
    let nextState = states.filter(
      (state) => state.state_value == nextStateId
    )[0];
    trace.push({ state: nextState.state_value, input: testString[i + 1] });


  }
}

function final_check() {
  let stateName = trace[trace.length - 1].state;
  let finalState = states.filter((state) => state.state_value == stateName)[0];

  if (finalState.isFinal) {
    console.log("accepted");
    accept_destination.innerHTML = `Accepted`;
  } else {
    accept_destination.innerHTML = `Not Accepted`;
    
  }
}
function render_trace(trace) {
  let s = "";
  trace.forEach((ele) => {
    s += `     <div class="state-circle">${ele.state}</div>`;
    if (ele.input) {
      s += `<div class="line">${ele.input}</div>`;
    }
  });

  return s;
}

//=============================================================================

function fetch_table(input_list, states_list, input_list_values) {
  states_list.forEach((state) => {
    let final, stateName;
    const array_input = [];

    for (let i = 0; i < input_list.length + 2; i++) {
      if (i == 0) {
        final = state.children[i].firstChild.checked;
      } else if (i == 1) {
        stateName = state.children[i].firstChild.value;
      } else {
        // it's an input and destination

        const input_value = {
          input: input_list_values[i - 2],
          destination: state.children[i].firstChild.value,
        };
        array_input.push(input_value);
      }
    }

    const s = new State(final, stateName, array_input);
    states.push(s);
  });
}
const check_btn = document.querySelector(".check");
const string_field = document.querySelector(".my-string");
const check_destination = document.querySelector('.check-result');

check_btn.addEventListener("click", function () {
  
  states = [];
  trace = [];

  const testString = string_field.value;

  const input_list = document.querySelectorAll(".table-input");
  const states_list = document.querySelectorAll(".single-state");

  const input_list_values = Array.from(input_list).map((ele) => {
    return ele.value;
  });

  fetch_table(input_list, states_list, input_list_values);
  find_init(testString);
  find_rest(testString);
  final_check();
  check_destination.innerHTML = render_trace(trace);
});
