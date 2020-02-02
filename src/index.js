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
        `<li class="cask block rounded p-2 mb-3 bg-white hover:bg-blue-100 leading-loose">
          <a class="text-lg font-normal text-blue-800 hover:underline" target="_BLANK" href="${cask.homepage}">${cask.name.join(" - ")}</a>
          <div class="block">
            <code class="inline font-hairline text-sm">$ </code>
            <code class="inline font-hairline text-sm">brew cask install ${cask.token}<code>
          </div>
        </li>`
    )
    .join("");
  $stats.innerHTML = `Listing ${caskList.length} casks.`;
  $results.innerHTML = output;
};

const runSearch = e => {
  const output = caskList.filter(cask => cask.token.indexOf(e) === 0);
  updateCaskList(output);
};

$search.addEventListener("keyup", e => runSearch(e.target.value));

getCaskList();