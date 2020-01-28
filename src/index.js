import "./styles.css";

const URL = "https://formulae.brew.sh/api/cask.json";
let caskList = [];
const $search = document.getElementById("search");
const $results = document.getElementById("results");
const $stats = document.getElementById("stats");

const getCaskList = async () => {
  const response = await fetch(URL);
  caskList = await response.json();
  updateCaskList(caskList);
};

const updateCaskList = caskList => {
  const output = caskList
    .map(
      cask =>
        `<li>
          <div>
            <h3>${cask.name.join(" - ")}</h3>
            <a target="_BLANK" href="${cask.homepage}">${cask.token}</a>
          </div>
        </li>`
    )
    .join("");
  $stats.innerHTML = `Listing ${caskList.length} casks.`;
  $results.innerHTML = output;
};
getCaskList();

const runSearch = e => {
  const output = caskList.filter(cask => cask.token.indexOf(e) === 0);
  updateCaskList(output);
};
$search.addEventListener("keyup", e => runSearch(e.target.value));
