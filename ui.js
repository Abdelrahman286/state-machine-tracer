const generating_btn = document.querySelector(".create");
const states_number = document.querySelector(".states-number");
const input_number = document.querySelector(".input-number");
const destination = document.querySelector(".table");

generating_btn.addEventListener("click", function () {
  const states_num = states_number.value;
  const input_num = input_number.value;

  const head_string = `<div class="head-row">
  <div class="final-head">F</div>
  <div class="state-head">States</div>
  <div class="input-head">Input</div>
  </div>`;

  const input_head = function () {
    let s = "";
    let c = 0;
    for (let i = 0; i < input_num; i++) {
      s += `<div class="input-value"><input value="${c++}" class="table-box table-input" type="text"></div>`;
    }

    return s;
  };
  const second_row_string = `  <div class="2nd-row row">
    <div class="final-head">-</div>
    <div class="state-head">-</div>
    ${input_head()}
    </div>`;

  const row_generator = function () {
    let r = "";

    // for testing ---------->
    let dump_states = ["a", "b", "c"];
    let states_c = 0;
    //----------------------->
    for (let i = 0; i < states_num; i++) {
      r += `
       <div class="row single-state">
         <div class="final-head"><input  type="checkbox" name="" id=""></div>
         <div class="state-head"><input value="${
           dump_states[states_c++]
         }" class="table-box" type="text"></div>`;

      for (let j = 0; j < input_num; j++) {
        // random state index
        let r_state = Math.floor(Math.random() * 3);
        r += `<div class="input-value"><input   value="${dump_states[r_state]}"  class="table-box" type="text"></div>`;
      }
      r += `</div>`;
    }
    return r;
  };
  const all_rows = row_generator();

  destination.innerHTML = head_string + second_row_string + all_rows;
});
