'use strict';
//Navbar
let navbarForm = document.querySelector('form');
let navUserName = document.querySelector('.navbar__form__userName');
let navPin = document.querySelector('.navbar__form__pin');
let navbarSubmit = document.querySelector('.navbar__form__submit');
let navTitle = document.querySelector('.navbar__paragraph');

//content
let contentContainer = document.querySelector('.contentContainer');

//left content
let balanceList = document.querySelector('.content__left--balanceList');
let balanceItem = document.querySelector('.content__left--balanceList--item');
let balanceIn = document.querySelector('.content__left--info--in');
let balanceOut = document.querySelector('.content__left--info--out');
let balanceInterest = document.querySelector('.content__left--info--interest');
let balanceSort = document.querySelector('.content__left--info--sort');
let balanceDate = document.querySelector(
  '.content__left--balanceList--item--date'
);
let leftheader = document.querySelector('.content__left--header--paragraph');

//right content
let balance = document.querySelector('.content__right--balance');
let logOutTime = document.querySelector('.content__left--info--time span');

//transfer
let transferContainer = document.querySelector(
  '.content__right--transfer--container'
);
let transferUserName = document.querySelector(
  '.content__right--transfer--transferTo--input'
);
let transferAmount = document.querySelector(
  '.content__right--transfer--amount--input'
);
let transferButton = document.querySelector(
  '.content__right--transfer--submit'
);

//request
let requestContainer = document.querySelector(
  '.content__right--request--container'
);
let requestAmount = document.querySelector(
  '.content__right--request--amount--input'
);
let requestButton = document.querySelector('.content__right--request--submit');

//close
let closeContainer = document.querySelector(
  '.content__right--close--container'
);
let closeUserName = document.querySelector(
  '.content__right--close--confirmUser--input'
);
let closePin = document.querySelector(
  '.content__right--close--confirmPin--input'
);
let closeButton = document.querySelector('.content__right--close--submit');

//database
let acc1 = {
  name: 'Jason Tong',
  password: 111,
  balanceHistory: [100, 200, -345, 134, -64, 135, 234, 98],
  interest: 1.5,
  date: [
    '2022-01-30T21:31:17.178Z',
    '2022-01-31T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  MataUang: 'idr',
  format: 'fr-FR',
};

let acc2 = {
  name: 'Jouis Callista',
  password: 222,
  balanceHistory: [200, 543, -842, 641, -23, -135, 983, 186],
  interest: 1.2,
  date: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  MataUang: 'EUR',
  format: 'nyn-UG',
};

let acc3 = {
  name: 'Chris Jericho',
  password: 333,
  balanceHistory: [947.42, -264.3456, 638.352, -231, 986, -252, 136.67, -332],
  interest: 1.7,
  date: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  MataUang: 'JPY',
  format: 'id-ID',
};

let accs = [acc1, acc2, acc3];

//Alias
accs.forEach((item) => {
  let hasil = item.name
    .toLowerCase()
    .split(' ')
    .map((item2) => item2[0])
    .join('');
  item.alias = hasil;
});

//login
let currAccount;

navbarForm.addEventListener('submit', (e) => {
  e.preventDefault();
  accs.forEach((item, index) => {
    if (
      navUserName.value === item.name &&
      Number(navPin.value) === item.password
    ) {
      contentContainer.style.opacity = 100;
      currAccount = item;
    }
  });

  navPin.value = '';
  navUserName.value = '';
  displayAll(currAccount);
  navTitle.textContent = `Welcome back, ${currAccount.name}`;
  contentContainer.style.transform = 'translateX(0)';
});

//sort balance
let sorted = false;
balanceSort.addEventListener('click', (e) => {
  e.preventDefault();
  let arrTemp = [...currAccount.balanceHistory];
  let newArr = arrTemp.sort((curr, next) => curr - next);
  sorted ? displayList(currAccount.balanceHistory) : displayList(newArr);
  sorted = !sorted;
});

//request
requestContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(requestAmount.value);
  currAccount.balanceHistory.push(Number(requestAmount.value));
  currAccount.date.push(new Date());
  requestAmount.value = '';
  displayAll(currAccount);
});

//close
closeContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  if (closeUserName.value !== currAccount.alias) {
    accs.some(
      (item) =>
        item.alias === closeUserName.value &&
        item.password === Number(closePin.value)
    )
      ? accs.splice(
          accs.findIndex((item2) => item2.alias === closeUserName.value),
          1
        )
      : null;
  }

  closeUserName.value = '';
  closePin.value = '';
  console.log(accs);
});

//transfer
transferContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    transferUserName.value !== currAccount.alias &&
    currAccount.totalBalance >= Number(transferAmount.value)
  ) {
    if (accs.some((item) => item.alias === transferUserName.value)) {
      let index =
        accs[accs.findIndex((item2) => item2.alias === transferUserName.value)];

      index.balanceHistory.push(Number(transferAmount.value));
      index.date.push(new Date());
    }

    currAccount.balanceHistory.push(Number(transferAmount.value) * -1);
    currAccount.date.push(new Date());
    displayAll(currAccount);
  }

  transferUserName.value = '';
  transferAmount.value = '';
});

//function
function displayAll(curr) {
  displayBalance(curr);
  displayList(curr);
  displayInOut(curr);
  leftheader.textContent = `As of ${Intl.DateTimeFormat().format(new Date())}`;
}

function displayBalance(acc) {
  let sum = acc.balanceHistory.reduce((acc, curr) => acc + curr);
  sum = sum.toFixed(2);
  balance.textContent = `${Intl.NumberFormat(acc.format, {
    style: 'currency',
    currency: `${acc.MataUang}`,
  }).format(sum)}`;
  acc.totalBalance = sum;
}

function displayList(acc) {
  let html = ``;
  balanceList.innerText = '';
  acc.balanceHistory.forEach((item, index) => {
    html = `<div class="content__left--balanceList--item">
        <div
            class="content__left--balanceList--item--paragraphContainer ${
              item > 0 ? 'deposit' : 'withdraw'
            }"
        >
            <p class="content__left--balanceList--item--paragraph">
            ${index + 1} ${item > 0 ? 'deposit' : 'withdraw'}
            </p>
        </div>
        <p class="content__left--balanceList--item--date">
            ${convertDate(acc, index)}
        </p>
        <h2 class="content__left--balanceList--item--h2">${Intl.NumberFormat(
          `${acc.format}`,
          {style: 'currency', currency: `${acc.MataUang}`}
        ).format(item.toFixed(2))}
        </h2>
        </div>`;

    balanceList.insertAdjacentHTML('afterbegin', html);
  });
}

function convertDate(acc, index) {
  let dt = new Date(acc.date[index]);

  return Intl.DateTimeFormat(acc.format).format(dt);
}

let autoLogOut;

function displayInOut(list) {
  let pos = 0,
    neg = 0,
    int = 0;
  list.balanceHistory.forEach((item, index) => {
    item > 0 ? (pos += item) : (neg += item);
  });

  int = list.balanceHistory
    .filter((item) => item > 0)
    .map((item) => (item * list.interest) / 100)
    .filter((item) => item > 1)
    .reduce((acc, curr) => acc + curr);

  balanceIn.innerHTML = `In <span>${Intl.NumberFormat(`${list.format}`, {
    style: 'currency',
    currency: `${list.MataUang}`,
  }).format(pos.toFixed(2))}</span>`;
  balanceOut.innerHTML = `Out <span>${Intl.NumberFormat(`${list.format}`, {
    style: 'currency',
    currency: `${list.MataUang}`,
  }).format(neg.toFixed(2) * -1)}</span>`;
  balanceInterest.innerHTML = `Interest <span>${Intl.NumberFormat(
    `${list.format}`,
    {style: 'currency', currency: `${list.MataUang}`}
  ).format(int.toFixed(2))}</span>`;

  //time
  let milisec = 20;

  if (autoLogOut !== undefined) {
    clearInterval(autoLogOut);
  }

  console.log(autoLogOut);

  autoLogOut = setInterval(() => {
    let min = milisec / 60;
    let sec = milisec % 60;
    logOutTime.textContent =
      `${Math.trunc(min)}`.padStart(2, 0) + `:` + `${sec}`.padStart(2, 0);

    if (milisec === 0) {
      clearInterval(autoLogOut);
      contentContainer.style.opacity = 0;
    }

    milisec--;
  }, 1000);
}
